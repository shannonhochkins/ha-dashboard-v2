import { useState } from "react";
import { motion } from "framer-motion";
import {
  computeDomain,
  useAreas,
  EntityName,
  OFF,
  FilterByDomain,
} from "@hakit/core";
import styled from "@emotion/styled";
import {
  AreaCard,
  Row,
  ButtonCard,
  MediaPlayerCard,
  Group,
  Column,
  EntitiesCard,
  EntitiesCardRow,
  SensorCard,
  TriggerCard,
  CameraCard,
} from "@hakit/components";
import { groupBy, uniqBy, capitalize } from "lodash";
import { configuration } from "../../config";
import { HassEntity } from "home-assistant-js-websocket";
import { DragSlider } from "../DragSlider";

const StyledAreaCard = styled(AreaCard)`
  margin-top: 1rem;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const Item = styled(motion.div)`
  width: 40vw;
  aspect-ratio: 16 / 9;
  flex-shrink: 0;
`;

function getDefaultService(entity: HassEntity): string {
  const domain = computeDomain(entity.entity_id as EntityName);
  switch (domain) {
    case "lock":
      return entity.state === "locked" ? "unlock" : "lock";
    case "water_heater":
      return entity.state === OFF ? "turnOn" : "turnOff";
    case "scene":
      return "turnOn";
    case "automation":
      return "trigger";
    default:
      return "toggle";
  }
}

export function AreaSlider() {
  const areas = useAreas();
  const [dragging, setDragging] = useState(false);
  return (
    <DragSlider
      slideApperance="scale"
      onDragStart={() => {
        setDragging(true);
      }}
      onDragEnd={() => {
        setDragging(false);
      }}
    >
      {areas
        .filter((area) => area.picture)
        .map((area) => {
          // group the entities by domain
          const groupedByDomain = groupBy(
            uniqBy([...area.entities], (entity) => entity.entity_id),
            (e) => {
              return computeDomain(e.entity_id as EntityName);
            },
          );
          return (
            <Item key={area.area_id}>
              <StyledAreaCard
                id={area.area_id}
                disable={dragging}
                disableColumns
                hash={area.area_id}
                title={area.name}
                image={area.picture as string}
                {...(configuration.areas?.[area.area_id]?.card ?? {})}
              >
                <Column
                  gap="1rem"
                  fullWidth
                  style={{
                    padding: "1rem",
                  }}
                >
                  {Object.keys(groupedByDomain).length === 0 && (
                    <Group title="No entities in this area" />
                  )}
                  {Object.entries(groupedByDomain).map(([domain, entities]) => {
                    if (entities.length === 0) {
                      return null;
                    }
                    const getContents = () => {
                      if (
                        domain === "light" ||
                        domain === "switch" ||
                        domain === "cover" ||
                        domain === "script"
                      ) {
                        return entities.map((entity, index) => {
                          return (
                            <ButtonCard
                              key={index}
                              // @ts-expect-error - TODO - fix service types
                              service={getDefaultService(entity)}
                              entity={
                                entity.entity_id as FilterByDomain<
                                  EntityName,
                                  "cover" | "switch" | "light" | "script"
                                >
                              }
                            />
                          );
                        });
                      }
                      if (domain === "media_player") {
                        return entities.map((entity, index) => {
                          return (
                            <MediaPlayerCard
                              key={index}
                              entity={
                                entity.entity_id as FilterByDomain<
                                  EntityName,
                                  "media_player"
                                >
                              }
                            />
                          );
                        });
                      }
                      if (domain === "camera") {
                        return entities.map((entity, index) => {
                          return (
                            <CameraCard
                              key={index}
                              entity={
                                entity.entity_id as FilterByDomain<
                                  EntityName,
                                  "camera"
                                >
                              }
                            />
                          );
                        });
                      }
                      if (domain === "sensor") {
                        return entities.map((entity, index) => {
                          return (
                            <SensorCard
                              key={index}
                              entity={
                                entity.entity_id as FilterByDomain<
                                  EntityName,
                                  "sensor"
                                >
                              }
                            />
                          );
                        });
                      }
                      if (domain === "automation") {
                        return entities.map((entity, index) => {
                          return (
                            <TriggerCard
                              key={index}
                              entity={
                                entity.entity_id as FilterByDomain<
                                  EntityName,
                                  "automation"
                                >
                              }
                              service="trigger"
                            />
                          );
                        });
                      }
                      return (
                        <EntitiesCard includeLastUpdated>
                          {entities.map((entity, index) => {
                            return (
                              <EntitiesCardRow
                                key={index}
                                entity={entity.entity_id as EntityName}
                              />
                            );
                          })}
                        </EntitiesCard>
                      );
                    };
                    return (
                      <Group
                        key={domain}
                        title={`${capitalize(domain).replace(
                          /_/g,
                          " ",
                        )} entities`}
                      >
                        <Row
                          gap="1rem"
                          fullWidth
                          alignItems="flex-start"
                          justifyContent="flex-start"
                        >
                          {getContents()}
                        </Row>
                      </Group>
                    );
                  })}
                </Column>
              </StyledAreaCard>
            </Item>
          );
        })}
    </DragSlider>
  );
}

// export function AreaSlider() {
//   const areas = useAreas();
//   const [leftBoundary, setLeftBoundary] = useState(0);
//   const [dragging, setDragging] = useState(false);
//   const controls = useAnimation();
//   const { width, ref } = useResizeDetector({
//     refreshMode: "debounce",
//     refreshRate: 200,
//   });

//   useEffect(() => {
//     setLeftBoundary((ref.current?.scrollWidth ?? 0) - (width ?? 0));
//     // Reset the x position when leftBoundary changes
//     controls.start({ x: 0 });
//   }, [width, controls, ref]);
//   return <Carousel>
//     <CarouselInner
//     animate={controls}
//     whileTap={{ cursor: "grabbing" }}
//     ref={ref}
//     drag="x"
//     dragConstraints={{
//       right: 0,
//       left: -leftBoundary,
//     }} onDragStart={() => {
//       setDragging(true);
//     }} onDragEnd={() => {
//       setDragging(false);
//     }}>
//       {areas.filter(area  => area.picture).map(area => {
//         // group the entities by domain
//         const groupedByDomain = groupBy(uniqBy([...area.entities], entity => entity.entity_id), (e) => {
//           return computeDomain(e.entity_id as EntityName);
//         });
//         if (area.area_id.includes('office')) {
//           console.log('area', area);
//           console.log('groupedByDomain', groupedByDomain);
//         }
//         return (<Item key={area.area_id}>
//           <StyledAreaCard id={area.area_id} disable={dragging} disableColumns hash={area.area_id} title={area.name} image={area.picture as string} {...configuration.areas?.[area.area_id]?.card ?? {}}>
//             <Column gap="1rem" fullWidth style={{
//               padding: '1rem'
//             }}>
//               {Object.keys(groupedByDomain).length === 0 && <Group title="No entities in this area" />}
//               {Object.entries(groupedByDomain).map(([domain, entities]) => {
//                 if (entities.length === 0) {
//                   return null;
//                 }
//                 const getContents = () => {
//                   if (domain === 'light' || domain === 'switch' || domain === 'cover' ||  domain === 'script') {
//                     return entities.map((entity, index) => {
//                       return <ButtonCard
//                         key={index}
//                         // @ts-expect-error - TODO - fix service types
//                         service={getDefaultService(entity)}
//                         entity={entity.entity_id as FilterByDomain<EntityName, 'cover' | 'switch' | 'light' | 'script'>} />
//                     })
//                   }
//                   if (domain === 'media_player') {
//                     return entities.map((entity, index) => {
//                       return <MediaPlayerCard key={index} entity={entity.entity_id as FilterByDomain<EntityName, 'media_player'>} />
//                     });
//                   }
//                   if (domain === 'camera') {
//                     return entities.map((entity, index) => {
//                       return <CameraCard key={index} entity={entity.entity_id as FilterByDomain<EntityName, 'camera'>} />
//                     });
//                   }
//                   if (domain === 'sensor') {
//                     return entities.map((entity, index) => {
//                       return <SensorCard key={index} entity={entity.entity_id as FilterByDomain<EntityName, 'sensor'>} />
//                     });
//                   }
//                   if (domain === 'automation') {
//                     return entities.map((entity, index) => {
//                       return <TriggerCard key={index} entity={entity.entity_id as FilterByDomain<EntityName, 'automation'>} service="trigger" />
//                     });
//                   }
//                   return <EntitiesCard includeLastUpdated>
//                     {entities.map((entity, index) => {
//                       return <EntitiesCardRow key={index} entity={entity.entity_id as EntityName} />
//                     })}
//                   </EntitiesCard>
//                 }
//                 return <Group key={domain} title={`${capitalize(domain).replace(/_/g, ' ')} entities`}>
//                   <Row gap="1rem" fullWidth alignItems="flex-start" justifyContent="flex-start">
//                     {getContents()}
//                   </Row>
//                 </Group>
//               })}
//             </Column>
//           </StyledAreaCard>
//         </Item>);
//       })}
//     </CarouselInner>
//   </Carousel>
// }

// interface VariantProps {
//   direction: number;
//   position: () => 'left' | 'center' | 'right';
// }

// const variants = {
//   enter: ({ direction }: VariantProps) => {
//     return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 };
//   },
//   center: ({ position, direction }: VariantProps) => {
//     console.log('x', position());
//     return {
//       scale: position() === "center" ? 1 : 0.7,
//       x: 0,
//       zIndex: getZIndex({ position, direction }),
//       opacity: 1
//     };
//   },
//   exit: ({ direction }: VariantProps) => {
//     return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 };
//   }
// };

// function getZIndex({ position, direction }: VariantProps) {
//   const indexes = {
//     left: direction > 0 ? 2 : 1,
//     center: 3,
//     right: direction > 0 ? 1 : 2
//   };
//   return indexes[position()];
// }

// // const variants = {
// //   enter: (direction: number) => {
// //     return {
// //       x: direction > 0 ? 1000 : -1000,
// //       opacity: 0
// //     };
// //   },
// //   center: {
// //     zIndex: 1,
// //     x: 0,
// //     opacity: 1
// //   },
// //   exit: (direction: number) => {
// //     return {
// //       zIndex: 0,
// //       x: direction < 0 ? 1000 : -1000,
// //       opacity: 0
// //     };
// //   }
// // };

// /**
//  * Experimenting with distilling swipe offset and velocity into a single variable, so the
//  * less distance a user has swiped, the more velocity they need to register as a swipe.
//  * Should accomodate longer swipes and short flicks without having binary checks on
//  * just distance thresholds and velocity > 0.
//  */
// const swipeConfidenceThreshold = 10000;
// const swipePower = (offset: number, velocity: number) => {
//   return Math.abs(offset) * velocity;
// };

// export const AreaSlider = () => {
//   const areas = useAreas();
//   const [[page, direction], setPage] = useState([0, 0]);

//   // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
//   // then wrap that within 0-2 to find our image ID in the array below. By passing an
//   // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
//   // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
//   const imageIndex = wrap(0, areas.length, page);

//   // we want the scope to be always to be in the scope of the array so that the carousel is endless
//   const indexInArrayScope =
//     ((page % areas.length) + areas.length) % areas.length;
//   // so that the carousel is endless, we need to repeat the items twice
//   // then, we slice the the array so that we only have 3 items visible at the same time
//   const visibleItems = [...areas, ...areas].slice(
//     indexInArrayScope,
//     indexInArrayScope + 3
//   );

//   console.log('areas', areas);

//   const paginate = (newDirection: number) => {
//     setPage((prevIndex) => [prevIndex[0] + newDirection, newDirection]);
//   };

//   return (
//     <Wrapper>
//       {/*AnimatePresence is necessary to show the items after they are deleted because only max. 3 are shown*/}
//       <AnimatePresence initial={false} custom={direction}>
//         {visibleItems.map((item) => {
//             // The layout prop makes the elements change its position as soon as a new one is added
//             // The key tells framer-motion that the elements changed its position
//             return (
//               <Image
//                 className="area-image"
//                 key={item.area_id}
//                 layout
//                 custom={{
//                   direction,
//                   position: () => {
//                     if (item === visibleItems[0]) {
//                       return "left";
//                     } else if (item === visibleItems[1]) {
//                       return "center";
//                     } else {
//                       return "right";
//                     }
//                   }
//                 }}
//                 src={item.picture as string}
//                 variants={variants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 }
//                 }}
//                 drag="x"
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={1}
//                 onDragEnd={(e, { offset, velocity }) => {
//                   const swipe = swipePower(offset.x, velocity.x);
//                   if (swipe < -swipeConfidenceThreshold) {
//                     paginate(1);
//                   } else if (swipe > swipeConfidenceThreshold) {
//                     paginate(-1);
//                   }
//                 }}
//               />
//             );
//       })}
//       </AnimatePresence>
//       <div className="next" onClick={() => paginate(1)}>
//         {"‣"}
//       </div>
//       <div className="prev" onClick={() => paginate(-1)}>
//         {"‣"}
//       </div>
//     </Wrapper>
//   );
// };
