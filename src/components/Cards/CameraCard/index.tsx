import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { groupBy, uniqBy } from 'lodash';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactSelect from 'react-select';
import { Icon } from '@iconify/react';
import { Popup } from '@components';

const CameraCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const CameraCardContent = styled.div`
  flex-grow: 1;
  position: relative;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
`;

const DateDisplay = styled.div`
  color: white;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 8px;
  background-color: rgba(0,0,0,0.5);
`;

const CameraInner = styled.div`
  position: relative;
  overflow: hidden;
  padding-bottom: 39px;
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
  margin: 1rem;
  border-radius: 24px;
  @media only screen and (max-width : 600px) {
    flex: 0 0 100%;
    margin: 1rem 0;
  }
  @media only screen and (min-width : 601px) {
    flex: 0 0 calc(50% - 2rem);
  }
  @media only screen and (min-width : 1000px) {
    flex: 0 0 calc(33.3% - 2rem);
  }
  @media only screen and (min-width : 1400px) {
    flex: 0 0 calc(25% - 2rem);
  }
  @media only screen and (min-width : 1600px) {
    flex: 0 0 calc(20% - 2rem);
  }
`;

const CameraImage = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
`;

const Row = styled.div`
  display:flex;
  align-items: center;
  margin: 20px;
  color: var(--ha-text-light);
  > span {
    padding-right: 10px;
  }
`;

const Select = styled(ReactSelect)`
  width: 300px;
`;

const Actions = styled.div`
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom:0;
  right: 0;
  left: 0;
  padding: 10px 20px;
  display: flex;
  background-color: rgba(0,0,0,0.3);
  a {
    color: white;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    svg {
      margin-left: 6px;
    }
    span {
      color: white;
    }
  }
`;

const Loading = styled(Icon)`
  font-size: 80px;
  color: white;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

const Refresh = styled(Icon)`
  margin-left: 10px;
  font-size: 32px;
  cursor: pointer;
`;

const PaginationIcon = styled(Icon)`
  margin-left: 10px;
  font-size: 32px;
  cursor: pointer;
`;

interface Asset {
  name: string;
  year: string;
  month: string;
  key: number;
  day: string;
  date: number;
  dateString: string;
  path: string;
  stat: {
    accessed: string;
    changed: string;
    gid: number;
    isBlockDevice: boolean;
    isCharacterDevice: boolean;
    isDirectory: boolean;
    isFIFO: boolean;
    isSocket: boolean;
    isSymbolicLync: boolean;
    mode: string;
    size: number;
    statusChanged: string;
    uid: number;
  }
}


interface AssetsByDate {
  [dateString: string]: Asset[]
}
// used to find assets that are 60s apart from each other (groups events together)
const TIME_SPAN = 60;

function download(url, ref, cb) {
  const req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("progress", function (evt) {
      if (evt.lengthComputable) {
        const percentComplete = evt.loaded / evt.total;
        ref.innerHTML = Number(percentComplete * 100).toFixed(0) + '%'
        if (percentComplete >= 1) {
          cb();
        }
      }
  }, false);
  req.responseType = "blob";
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
          var filename = url.split('/').pop();
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(req.response);
          link.download = filename;
          link.click();
      }
  };
  req.send();
}


function createdAt(d) {
  const today = new Date(d);
  let h = today.getHours();
  const m = today.getMinutes();
  const s = today.getSeconds();
  const meridian = h >= 12 ? "PM" : "AM";
  h = h % 12;
  return (h ? h : 12) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + " " + meridian;
}

type PaginationOptions<T> = {
  page: number,
  pageSize: number,
  data: T[]
}

function paginate<T>({ page = 1, pageSize = 10, data = [] }: PaginationOptions<T>): { 
  currentPage: number,
  data: T[],
  totalPages: number,
  pageSize: number
} {
  const startIndex = (Math.max(page - 1, 0)) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = [...data].slice(startIndex, endIndex);
  const totalPages = Math.max(Math.ceil(data.length / pageSize), 1);
  return {
    currentPage: Math.min(Math.max(page, 1), totalPages),
    data: paginatedData,
    totalPages: totalPages,
    pageSize: pageSize
  };
}

export function CameraCard({ open, onClose, camera, title }: { open: boolean, onClose: () => void, camera: string, title: string }) {
  const [assets, setAssets] = useState<AssetsByDate>({});
  const [day, setDay] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const progressRefs = useRef({});
  const [downloadingVideo, setDownloadingVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState<Asset[][] | null>(null);
  const [allData, setAllData] = useState<Asset[][] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    setLoading(true);
    fetch(`https://rwdwrtzkr59smlxgb934b72q647a3zr1.ui.nabu.casa/local/${camera}.json?d=${Date.now()}`, {
    }).then(r => r.json()).then($assets => {
      const mapped = $assets.map((a, index) => {
        const matched = a.match(/(\d{4})+(\d{2})+(\d{2})+(\d{2})+(\d{2})+(\d{2})/);
        if (matched === null) {
          return null;
        }
        const [fullMatch, year, month, day, hour, min, sec] = matched;
        const dateString = `${year}/${month}/${day}`;
        const dateCreated = new Date(`${year}-${month}-${day}T${hour}:${min}:${sec}`);
        return {
          name: a,
          year,
          month,
          day,
          path: `https://homeassistant.local:8080${a}`,
          dateString,
          key: index,
          date: dateCreated.getTime()
        }
      }).filter(x => x !== null);
      const groupedAssets = groupBy(mapped.sort((a, b) => a.date - b.date), a => a.dateString);
      setAssets(groupedAssets);
      setDay(Object.keys(groupedAssets).pop());
      setLoading(false);
    })
  }

  function relatedDates(a, b) {
    return (a.date - b.date >= 0 && a.date - b.date <= (TIME_SPAN * 1000)) || (b.date - a.date >= 0 && b.date - a.date <= (TIME_SPAN * 1000));
  }
  function getRelatedFiles(thumbs, asset) {
    const relatedThumbs = thumbs.filter(b => relatedDates(asset, b));
    const outputThumbs = thumbs.filter(t => !relatedThumbs.map(x => x.name).includes(t.name));
    const additional = relatedThumbs.flatMap(x => getRelatedFiles(outputThumbs, x));
    return uniqBy([...relatedThumbs, ...additional], a => a.date);
  }


  function getAvailableThumbnails(): Asset[][] | null {
    const key = day;
    const selectedDayEntries = {...assets}[key];
    if (selectedDayEntries) {
      const allThumbs = selectedDayEntries.filter(a => a.name.endsWith('jpg') && a.name.match(/[\d]_thumb\.jpg+/));
      const processed = [];
      const grouped = allThumbs.reduce((groups, a) => {
        // find images within a specific time period between each other
        if (processed.includes(a.name)) {
          return groups;
        }
        const related = getRelatedFiles(allThumbs, a);
        if (!groups[a.name]) {
          groups[a.name] = [];
        }
        groups[a.name].push(...related);
        processed.push(...related.map(r => r.name));
        return groups;
      }, {} as {
        [key in string]: Asset[]
      });
      return Object.values(grouped);
    }
    return null;
  }

  function findRelatedAssets(thumbnail) {
    const key = day;
    const selectedDayEntries = {...assets}[key];
    if (selectedDayEntries) {
      const nonThumnails = selectedDayEntries.filter(asset => !asset.name.includes('_thumb'));
      nonThumnails.sort((a, b) => Math.abs(a.date - thumbnail.date) - Math.abs(b.date - thumbnail.date));
      const relatedAssets = nonThumnails.slice(0, 2);
      return [
        relatedAssets.filter(a => a.name.includes('.jpg')),
        relatedAssets.filter(a => a.name.includes('.mp4'))
      ].flatMap(x => x);
    }
    return null;
  }

  function updatePageNumber(direction: number) {
    let _currentPage = currentPage;
    if (direction > 0) {
      // move forward if possible
      _currentPage += 1;
    } else {
      // move backwards
      _currentPage -= 1;
    }
    const { data, totalPages: $totalPages, currentPage: $currentPage } = paginate<Asset[]>({
      page: _currentPage,
      pageSize: 10,
      data: allData
    });
    setCurrentPage($currentPage);
    setThumbnails(data);
    setTotalPages($totalPages);
  }


  useEffect(() => {
    const $allThumbnails = getAvailableThumbnails();
    if ($allThumbnails !== null ) {
      const { data, totalPages: $totalPages } = paginate<Asset[]>({
        page: currentPage,
        pageSize: 10,
        data: $allThumbnails
      });
      setAllData($allThumbnails);
      setThumbnails(data);
      setTotalPages($totalPages);
    }
  }, [day]);


  const options = Object.keys(assets).map(d => ({
    label: d,
    value: d
  }));
  const selectedOption = options.find(d => d.value === day);
  

  return <>
    <Popup fillHeight={true} open={open} onClose={() => onClose()}>
      <CameraCardContainer>
        <Row>
          <span>{title}</span>
          <Select 
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: `var(--ha-background)`,
                borderColor: `var(--ha-highlight)`
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                color: `var(--ha-text-light)`
              }),
              input: (baseStyles, state) => ({
                ...baseStyles,
                color: `var(--ha-text-light)`
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: `var(--ha-background)`,
                color: `var(--ha-text-light)`
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: `var(--ha-background)`,
              })
            }}
            value={selectedOption}
            onChange={(e: {
              value: string;
              label: string
            }) => {
              setDay(e.value);
            }}
            options={options} />
            <Refresh onClick={() => requestData()} icon="material-symbols:refresh" />
            <p style={{ marginLeft: 40 }}>Page {currentPage} of {totalPages}</p>
            <PaginationIcon onClick={() => currentPage > 1 && updatePageNumber(-1)} icon="material-symbols:chevron-left" />
            <PaginationIcon onClick={() => currentPage !== totalPages && updatePageNumber(1)} icon="material-symbols:chevron-right" />
        </Row>
        {loading ? <Loading icon="line-md:loading-twotone-loop" /> : <CameraCardContent>
          {thumbnails && thumbnails.length === 0 && <Row><p>No camera data available for this date.</p></Row>}
          {thumbnails && [...thumbnails].reverse().map((groupedThumbnails, index) => {
            const [snapshot, $video] = findRelatedAssets(groupedThumbnails[0]);
            return groupedThumbnails && <CameraInner>
              {groupedThumbnails.length > 1 ? <Carousel animationHandler="fade" showThumbs={false}>
                {groupedThumbnails.map(a => {
                  return <div key={a.date}>
                    <CameraImage src={a.path} />
                    <DateDisplay>{createdAt(a.date)}</DateDisplay>
                  </div>
                })}
                </Carousel> : <><CameraImage src={groupedThumbnails[0].path} /><DateDisplay>{createdAt(groupedThumbnails[0].date)}</DateDisplay></>}  
              <Actions>
                <a href={snapshot.path} target="_blank">Raw image <Icon icon="material-symbols:image-outline" /></a>
                {$video.path && <a onClick={() => {
                  download($video.path, progressRefs.current[index], () => {
                    setDownloadingVideo(null);
                  });
                  setDownloadingVideo(groupedThumbnails[0].key);
                }} target="_blank">
                  {downloadingVideo === groupedThumbnails[0].key ? 'Downloading...' : 'Video'}
                  {downloadingVideo !== groupedThumbnails[0].key && <Icon icon="material-symbols:cloud-download-rounded" />}
                  <span style={{
                    display: downloadingVideo === groupedThumbnails[0].key ? 'block' : 'none'
                  }} ref={(element) => progressRefs.current[index] = element}></span>
                </a>}
              </Actions>
            </CameraInner>
          })}
        </CameraCardContent>}
      </CameraCardContainer>
    </Popup>
  </>
}