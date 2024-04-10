import React, { useEffect, useMemo, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import styled from "@emotion/styled";
import { HassEntityCustom, getIconByEntity } from "@hakit/core";

import { Icon } from "@iconify/react";

const ForecastIcon = styled(Icon)`
  font-size: 1.5rem;
  color: var(--ha-A100) !important;
`;

const View = styled.div<{
  ready: boolean;
}>`
  width: 100%;
  height: 100%;
  min-height: 200px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  ${(props) =>
    props.ready &&
    `
    opacity: 1;
  `}
  > svg {
    max-width: 100%;
  }
`;

const Interpolate = (
  value: number,
  minVal: number,
  maxVal: number,
  YTop: number,
  YBottom: number,
) => {
  return YBottom - ((value - minVal) / (maxVal - minVal)) * (YBottom - YTop);
};

interface WeatherChartProps {
  data: {
    values: number[];
    textTop?: string[];
    textBottom?: (string | string[])[];
    iconTop?: string[];
  };
  settings?: {
    fontSizeTop?: number;
    fontSizeBottom?: number;
    iconSize?: number;
    marginBottom?: number;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    markerSize?: number;
    markerStrokeSize?: number;
    showTextTop?: boolean;
    showTextTopLabel?: boolean;
    showTextBottom?: boolean;
    showIconTop?: boolean;
    showIconBottom?: boolean;
    showVerticalLines?: boolean;
    lineColor?: string;
    vlineColor?: string;
    vlineStroke?: string;
    topTextColor?: string;
    bottomTextColor?: string;
    bottomTextColor2?: string;
    markerFillColor?: string;
    markerStrokeColor?: string;
    noDataText?: string;
    noDataTextColor?: string;
    noDataFontSize?: number;
  };
}

const WeatherChart = ({ data, settings }: WeatherChartProps) => {
  const {
    width,
    height,
    ref: chartRef,
  } = useResizeDetector({
    refreshMode: "debounce",
    refreshRate: 200,
  });
  const [ready, setReady] = useState(false);
  const { values, textTop, textBottom, iconTop } = data;

  useEffect(() => {
    if (width && width > 0 && ready === false) {
      setReady(true);
    }
  }, [ready, width]);
  const c = useMemo(
    () => ({
      fontSizeTop: 12,
      fontSizeBottom: 12,
      iconSize: 40,
      marginBottom: 0,
      marginTop: 0,
      marginLeft: 30,
      marginRight: 30,
      markerSize: 4,
      markerStrokeSize: 1.5,
      showTextTop: true,
      showTextBottom: true,
      showIconTop: true,
      showIconBottom: true,
      showVerticalLines: true,
      lineColor: "var(--ha-S100-contrast)",
      vlineColor: "var(--ha-S100-contrast)",
      vlineStroke: "5,5",
      topTextColor: "var(--ha-S200-contrast)",
      bottomTextColor: "var(--ha-S200-contrast)",
      bottomTextColor2: "var(--ha-S500-contrast)",
      markerFillColor: "var(--ha-S50-contrast)",
      markerStrokeColor: "var(--ha-S100-contrast)",
      noDataText: "There is no data",
      noDataTextColor: "var(--ha-S200-contrast)",
      noDataFontSize: 12,
      ...settings,
    }),
    [settings],
  );
  const {
    calculatedY,
    chartWidth,
    colSpace,
    YBottom,
    YTextBottom,
    YTextTop,
    YIconTop,
  } = useMemo(() => {
    const colSpace =
      values.length > 0
        ? ((width ?? 0) - c.marginLeft - c.marginRight) / (values.length - 1)
        : 0;
    let minVal = 0,
      maxVal = 0;
    const chartWidth =
      values && values.length > 0
        ? width ?? 0 - c.marginLeft - c.marginRight
        : width ?? 0;

    const YTextTop = c.marginTop + c.fontSizeTop;
    const YTextBottom = (height ?? 0) - c.fontSizeBottom - c.marginBottom;
    const YIconTop = c.marginTop + (c.showTextTop ? c.fontSizeTop + 5 : 0);
    const YIconBottom =
      (height ?? 0) -
      (c.showTextBottom ? 12 + c.fontSizeBottom : 0) -
      (c.showIconBottom ? c.iconSize : 0) -
      c.marginBottom;
    const YTop = YIconTop + (c.showIconTop ? c.iconSize : 0) + c.markerSize;
    const YBottom = YIconBottom - c.markerSize;
    if (values.length > 0) {
      const sortedValues = [...values];
      sortedValues.sort(function (a, b) {
        return a - b;
      });
      minVal = sortedValues[0];
      maxVal =
        values.length == 1
          ? sortedValues[0] + 1
          : sortedValues[sortedValues.length - 1];
    }
    const calculatedY: number[] = [];
    values.map((item) => {
      calculatedY.push(Interpolate(item, minVal, maxVal, YTop, YBottom));
    });
    return {
      calculatedY,
      chartWidth,
      colSpace,
      YIconTop,
      YIconBottom,
      YBottom,
      YTextTop,
      YTextBottom,
    };
  }, [c, height, values, width]);
  return (
    <View ref={chartRef} ready={ready}>
      <svg height="100%" width={chartWidth > 0 ? chartWidth : "100%"}>
        {values.length == 0 ? (
          <>
            <text
              fill={c.noDataTextColor}
              fontSize={c.noDataFontSize}
              x="50%"
              y="50%"
              textAnchor="middle"
            >
              {c.noDataText}
            </text>
          </>
        ) : (
          values.map((_item, index) => (
            <React.Fragment key={`F1${index}`}>
              {index !== values.length - 1 && (
                <line
                  key={`L1${index}`}
                  stroke={c.lineColor}
                  x1={c.marginLeft + colSpace * index}
                  y1={calculatedY[index]}
                  x2={c.marginLeft + colSpace * (index + 1)}
                  y2={calculatedY[index + 1]}
                />
              )}
              {c.showVerticalLines && (
                <line
                  key={`VL1${index}`}
                  stroke={c.vlineColor}
                  strokeDasharray={c.vlineStroke}
                  x1={c.marginLeft + colSpace * index}
                  y1={YBottom}
                  x2={c.marginLeft + colSpace * index}
                  y2={calculatedY[index]}
                />
              )}
              {c.showTextTop && (
                <text
                  key={`T1${index}`}
                  fill={c.topTextColor}
                  fontSize={c.fontSizeTop}
                  x={c.marginLeft + colSpace * index}
                  y={YTextTop}
                  textAnchor="middle"
                >
                  {textTop && textTop[index] ? textTop[index] : ""}
                </text>
              )}
              {c.showIconBottom && iconTop && iconTop[index] && (
                <foreignObject
                  key={`FO1${index}`}
                  width={c.iconSize}
                  height={c.iconSize}
                  x={c.marginLeft + colSpace * index - c.iconSize * 0.5}
                  y={YIconTop}
                >
                  <ForecastIcon
                    icon={
                      getIconByEntity("weather", {
                        state: iconTop[index] as string,
                      } as HassEntityCustom) as string
                    }
                    style={{
                      fontSize: c.iconSize,
                    }}
                  />
                </foreignObject>
              )}
              <circle
                key={`C1${index}`}
                cx={c.marginLeft + colSpace * index}
                cy={calculatedY[index]}
                r={c.markerSize}
                stroke={c.markerStrokeColor}
                strokeWidth={c.markerStrokeSize}
                fill={c.markerFillColor}
              />
              {c.showTextBottom &&
              textBottom &&
              Array.isArray(textBottom[index]) ? (
                <>
                  <text
                    key={`T21${index}`}
                    fill={c.bottomTextColor}
                    fontSize={c.fontSizeBottom}
                    x={c.marginLeft + colSpace * index}
                    y={YTextBottom - 10}
                    textAnchor="middle"
                  >
                    {textBottom && textBottom[index][0]
                      ? textBottom[index][0]
                      : ""}
                  </text>
                  <text
                    key={`T22${index}`}
                    fill={c.bottomTextColor2}
                    fontSize={c.fontSizeBottom}
                    x={c.marginLeft + colSpace * index}
                    y={YTextBottom + 5}
                    textAnchor="middle"
                  >
                    {textBottom && textBottom[index][1]
                      ? textBottom[index][1]
                      : ""}
                  </text>
                </>
              ) : (
                <text
                  key={`T2${index}`}
                  fill={c.bottomTextColor}
                  fontSize={c.fontSizeBottom}
                  x={c.marginLeft + colSpace * index}
                  y={YTextBottom}
                  textAnchor="middle"
                >
                  {textBottom && textBottom[index] ? textBottom[index] : ""}
                </text>
              )}
            </React.Fragment>
          ))
        )}
      </svg>
    </View>
  );
};
const WeatherChartMemoized = React.memo(WeatherChart);
export default WeatherChartMemoized;
