// this is an auto generated file, do not change this manually

import { ServiceFunction, ServiceFunctionTypes } from "@hakit/core";
declare module "@hakit/core" {
  export interface CustomSupportedServices<
    T extends ServiceFunctionTypes = "target",
  > {
    homeassistant: {
      // undefined
      savePersistentStates: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      stop: ServiceFunction<object, T, object>;
      // undefined
      restart: ServiceFunction<object, T, object>;
      // undefined
      checkConfig: ServiceFunction<object, T, object>;
      // undefined
      updateEntity: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
        }
      >;
      // undefined
      reloadCoreConfig: ServiceFunction<object, T, object>;
      // undefined
      setLocation: ServiceFunction<
        object,
        T,
        {
          //  @example 32.87336 @constraints  number: mode: box, min: -90, max: 90, step: any
          latitude: number;
          //  @example 117.22743 @constraints  number: mode: box, min: -180, max: 180, step: any
          longitude: number;
          //  @example 120 @constraints  number: mode: box, step: any
          elevation?: number;
        }
      >;
      // undefined
      reloadCustomTemplates: ServiceFunction<object, T, object>;
      // undefined
      reloadConfigEntry: ServiceFunction<
        object,
        T,
        {
          //  @example 8955375327824e14ba89e4b29cc3ec9a @constraints  config_entry:
          entry_id?: unknown;
        }
      >;
      // undefined
      reloadAll: ServiceFunction<object, T, object>;
    };
    persistentNotification: {
      // undefined
      create: ServiceFunction<
        object,
        T,
        {
          //  @example Please check your configuration.yaml.
          message: string;
          //  @example Test notification
          title?: string;
          //  @example 1234
          notification_id?: string;
        }
      >;
      // undefined
      dismiss: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          notification_id: string;
        }
      >;
      // undefined
      dismissAll: ServiceFunction<object, T, object>;
    };
    systemLog: {
      // undefined
      clear: ServiceFunction<object, T, object>;
      // undefined
      write: ServiceFunction<
        object,
        T,
        {
          //  @example Something went wrong
          message: string;
          //
          level?: "debug" | "info" | "warning" | "error" | "critical";
          //  @example mycomponent.myplatform
          logger?: string;
        }
      >;
    };
    logger: {
      // undefined
      setDefaultLevel: ServiceFunction<
        object,
        T,
        {
          //
          level?: "debug" | "info" | "warning" | "error" | "fatal" | "critical";
        }
      >;
      // undefined
      setLevel: ServiceFunction<object, T, object>;
    };
    frontend: {
      // undefined
      setTheme: ServiceFunction<
        object,
        T,
        {
          //  @example default
          name: string;
          //
          mode?: "dark" | "light";
        }
      >;
      // undefined
      reloadThemes: ServiceFunction<object, T, object>;
    };
    recorder: {
      // undefined
      purge: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 365, unit_of_measurement: days, step: 1, mode: slider
          keep_days?: number;
          //  @constraints  boolean:
          repack?: boolean;
          //  @constraints  boolean:
          apply_filter?: boolean;
        }
      >;
      // undefined
      purgeEntities: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @example sun @constraints  object: multiple: false
          domains?: object;
          //  @example domain*.object_id* @constraints  object: multiple: false
          entity_globs?: object;
          //  @constraints  number: min: 0, max: 365, unit_of_measurement: days, step: 1, mode: slider
          keep_days?: number;
        }
      >;
      // undefined
      enable: ServiceFunction<object, T, object>;
      // undefined
      disable: ServiceFunction<object, T, object>;
      // undefined
      getStatistics: ServiceFunction<
        object,
        T,
        {
          //  @example 2025-01-01 00:00:00 @constraints  datetime:
          start_time: string;
          //  @example 2025-01-02 00:00:00 @constraints  datetime:
          end_time?: string;
          //  @example sensor.energy_consumption,sensor.temperature @constraints  statistic: multiple: true
          statistic_ids: unknown;
          //  @example hour
          period: "5minute" | "hour" | "day" | "week" | "month";
          //  @example mean,sum
          types:
            | "change"
            | "last_reset"
            | "max"
            | "mean"
            | "min"
            | "state"
            | "sum";
          //  @example [object Object] @constraints  object: multiple: false
          units?: object;
        }
      >;
    };
    mediaPlayer: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      volumeUp: ServiceFunction<object, T, object>;
      // undefined
      volumeDown: ServiceFunction<object, T, object>;
      // undefined
      mediaPlayPause: ServiceFunction<object, T, object>;
      // undefined
      mediaPlay: ServiceFunction<object, T, object>;
      // undefined
      mediaPause: ServiceFunction<object, T, object>;
      // undefined
      mediaStop: ServiceFunction<object, T, object>;
      // undefined
      mediaNextTrack: ServiceFunction<object, T, object>;
      // undefined
      mediaPreviousTrack: ServiceFunction<object, T, object>;
      // undefined
      clearPlaylist: ServiceFunction<object, T, object>;
      // undefined
      volumeSet: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          volume_level: number;
        }
      >;
      // undefined
      volumeMute: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          is_volume_muted: boolean;
        }
      >;
      // undefined
      mediaSeek: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, step: 0.01, mode: box
          seek_position: number;
        }
      >;
      // undefined
      join: ServiceFunction<
        object,
        T,
        {
          //  @example - media_player.multiroom_player2 - media_player.multiroom_player3
          group_members: string[];
        }
      >;
      // undefined
      selectSource: ServiceFunction<
        object,
        T,
        {
          //  @example video1
          source: string;
        }
      >;
      // undefined
      selectSoundMode: ServiceFunction<
        object,
        T,
        {
          //  @example Music
          sound_mode?: string;
        }
      >;
      // undefined
      playMedia: ServiceFunction<
        object,
        T,
        {
          //  @example {'media_content_id': 'https://home-assistant.io/images/cast/splash.png', 'media_content_type': 'music'} @constraints  media:
          media: unknown;
          //
          enqueue?: "play" | "next" | "add" | "replace";
          //  @example true @constraints  boolean:
          announce?: boolean;
        }
      >;
      // undefined
      browseMedia: ServiceFunction<
        object,
        T,
        {
          //  @example music
          media_content_type?: string;
          //  @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
        }
      >;
      // undefined
      searchMedia: ServiceFunction<
        object,
        T,
        {
          //  @example Beatles
          search_query: string;
          //  @example music
          media_content_type?: string;
          //  @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
          //  @example album,artist
          media_filter_classes?: string;
        }
      >;
      // undefined
      shuffleSet: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          shuffle: boolean;
        }
      >;
      // undefined
      unjoin: ServiceFunction<object, T, object>;
      // undefined
      repeatSet: ServiceFunction<
        object,
        T,
        {
          //
          repeat: "off" | "all" | "one";
        }
      >;
    };
    hassio: {
      // undefined
      addonStart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonStop: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonRestart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonStdin: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      hostShutdown: ServiceFunction<object, T, object>;
      // undefined
      hostReboot: ServiceFunction<object, T, object>;
      // undefined
      backupFull: ServiceFunction<
        object,
        T,
        {
          //  @example Backup 1
          name?: string;
          //  @example password
          password?: string;
          //  @constraints  boolean:
          compressed?: boolean;
          //  @example my_backup_mount @constraints  backup_location:
          location?: string;
          //  @constraints  boolean:
          homeassistant_exclude_database?: boolean;
        }
      >;
      // undefined
      backupPartial: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          homeassistant?: boolean;
          //  @constraints  boolean:
          homeassistant_exclude_database?: boolean;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          addons?: object;
          //  @example homeassistant,share @constraints  object: multiple: false
          folders?: object;
          //  @example Partial backup 1
          name?: string;
          //  @example password
          password?: string;
          //  @constraints  boolean:
          compressed?: boolean;
          //  @example my_backup_mount @constraints  backup_location:
          location?: string;
        }
      >;
      // undefined
      restoreFull: ServiceFunction<
        object,
        T,
        {
          //
          slug: string;
          //  @example password
          password?: string;
        }
      >;
      // undefined
      restorePartial: ServiceFunction<
        object,
        T,
        {
          //
          slug: string;
          //  @constraints  boolean:
          homeassistant?: boolean;
          //  @example homeassistant,share @constraints  object: multiple: false
          folders?: object;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          addons?: object;
          //  @example password
          password?: string;
        }
      >;
    };
    ffmpeg: {
      // undefined
      start: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
      // undefined
      stop: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
      // undefined
      restart: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
    };
    update: {
      // undefined
      install: ServiceFunction<
        object,
        T,
        {
          //  @example 1.0.0
          version?: string;
          //  @constraints  boolean:
          backup?: boolean;
        }
      >;
      // undefined
      skip: ServiceFunction<object, T, object>;
      // undefined
      clearSkipped: ServiceFunction<object, T, object>;
    };
    conversation: {
      // undefined
      process: ServiceFunction<
        object,
        T,
        {
          //  @example Turn all lights on
          text: string;
          //  @example NL
          language?: string;
          //  @example homeassistant @constraints  conversation_agent:
          agent_id?: string;
          //  @example my_conversation_1
          conversation_id?: string;
        }
      >;
      // undefined
      reload: ServiceFunction<
        object,
        T,
        {
          //  @example NL
          language?: string;
          //  @example homeassistant @constraints  conversation_agent:
          agent_id?: string;
        }
      >;
    };
    switch: {
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    backup: {
      // undefined
      createAutomatic: ServiceFunction<object, T, object>;
    };
    tts: {
      // undefined
      speak: ServiceFunction<
        object,
        T,
        {
          //
          media_player_entity_id: string;
          //  @example My name is hanna
          message: string;
          //  @constraints  boolean:
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific @constraints  object: multiple: false
          options?: object;
        }
      >;
      // undefined
      clearCache: ServiceFunction<object, T, object>;
      // Say something using text-to-speech on a media player with google_translate.
      googleTranslateSay: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example My name is hanna
          message: string;
          //
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific
          options?: object;
        }
      >;
      // Say something using text-to-speech on a media player with cloud.
      cloudSay: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example My name is hanna
          message: string;
          //
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific
          options?: object;
        }
      >;
    };
    wakeOnLan: {
      // undefined
      sendMagicPacket: ServiceFunction<
        object,
        T,
        {
          //  @example aa:bb:cc:dd:ee:ff
          mac: string;
          //  @example 192.168.255.255
          broadcast_address?: string;
          //  @constraints  number: min: 1, max: 65535, mode: box, step: 1
          broadcast_port?: number;
        }
      >;
    };
    cloud: {
      // undefined
      remoteConnect: ServiceFunction<object, T, object>;
      // undefined
      remoteDisconnect: ServiceFunction<object, T, object>;
    };
    camera: {
      // undefined
      enableMotionDetection: ServiceFunction<object, T, object>;
      // undefined
      disableMotionDetection: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      snapshot: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/snapshot_{{ entity_id.name }}.jpg
          filename: string;
        }
      >;
      // undefined
      playStream: ServiceFunction<
        object,
        T,
        {
          //
          media_player: string;
          //
          format?: "hls";
        }
      >;
      // undefined
      record: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/snapshot_{{ entity_id.name }}.mp4
          filename: string;
          //  @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          lookback?: number;
        }
      >;
    };
    group: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      set: ServiceFunction<
        object,
        T,
        {
          //  @example test_group
          object_id: string;
          //  @example My test group
          name?: string;
          //  @example mdi:camera @constraints  icon:
          icon?: string;
          //  @example domain.entity_id1, domain.entity_id2
          entities?: string;
          //  @example domain.entity_id1, domain.entity_id2
          add_entities?: string;
          //  @example domain.entity_id1, domain.entity_id2
          remove_entities?: string;
          //  @constraints  boolean:
          all?: boolean;
        }
      >;
      // undefined
      remove: ServiceFunction<
        object,
        T,
        {
          //  @example test_group @constraints  object: multiple: false
          object_id: object;
        }
      >;
    };
    light: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //  @example [255, 100, 100] @constraints  color_rgb:
          rgb_color?: [number, number, number];
          //  @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: number;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_pct?: number;
          //  @constraints  number: min: -100, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_step_pct?: number;
          //
          effect?: string;
          //  @example [255, 100, 100, 50] @constraints  object: multiple: false
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70] @constraints  object: multiple: false
          rgbww_color?: [number, number, number, number, number];
          //
          color_name?:
            | "homeassistant"
            | "aliceblue"
            | "antiquewhite"
            | "aqua"
            | "aquamarine"
            | "azure"
            | "beige"
            | "bisque"
            | "blanchedalmond"
            | "blue"
            | "blueviolet"
            | "brown"
            | "burlywood"
            | "cadetblue"
            | "chartreuse"
            | "chocolate"
            | "coral"
            | "cornflowerblue"
            | "cornsilk"
            | "crimson"
            | "cyan"
            | "darkblue"
            | "darkcyan"
            | "darkgoldenrod"
            | "darkgray"
            | "darkgreen"
            | "darkgrey"
            | "darkkhaki"
            | "darkmagenta"
            | "darkolivegreen"
            | "darkorange"
            | "darkorchid"
            | "darkred"
            | "darksalmon"
            | "darkseagreen"
            | "darkslateblue"
            | "darkslategray"
            | "darkslategrey"
            | "darkturquoise"
            | "darkviolet"
            | "deeppink"
            | "deepskyblue"
            | "dimgray"
            | "dimgrey"
            | "dodgerblue"
            | "firebrick"
            | "floralwhite"
            | "forestgreen"
            | "fuchsia"
            | "gainsboro"
            | "ghostwhite"
            | "gold"
            | "goldenrod"
            | "gray"
            | "green"
            | "greenyellow"
            | "grey"
            | "honeydew"
            | "hotpink"
            | "indianred"
            | "indigo"
            | "ivory"
            | "khaki"
            | "lavender"
            | "lavenderblush"
            | "lawngreen"
            | "lemonchiffon"
            | "lightblue"
            | "lightcoral"
            | "lightcyan"
            | "lightgoldenrodyellow"
            | "lightgray"
            | "lightgreen"
            | "lightgrey"
            | "lightpink"
            | "lightsalmon"
            | "lightseagreen"
            | "lightskyblue"
            | "lightslategray"
            | "lightslategrey"
            | "lightsteelblue"
            | "lightyellow"
            | "lime"
            | "limegreen"
            | "linen"
            | "magenta"
            | "maroon"
            | "mediumaquamarine"
            | "mediumblue"
            | "mediumorchid"
            | "mediumpurple"
            | "mediumseagreen"
            | "mediumslateblue"
            | "mediumspringgreen"
            | "mediumturquoise"
            | "mediumvioletred"
            | "midnightblue"
            | "mintcream"
            | "mistyrose"
            | "moccasin"
            | "navajowhite"
            | "navy"
            | "navyblue"
            | "oldlace"
            | "olive"
            | "olivedrab"
            | "orange"
            | "orangered"
            | "orchid"
            | "palegoldenrod"
            | "palegreen"
            | "paleturquoise"
            | "palevioletred"
            | "papayawhip"
            | "peachpuff"
            | "peru"
            | "pink"
            | "plum"
            | "powderblue"
            | "purple"
            | "red"
            | "rosybrown"
            | "royalblue"
            | "saddlebrown"
            | "salmon"
            | "sandybrown"
            | "seagreen"
            | "seashell"
            | "sienna"
            | "silver"
            | "skyblue"
            | "slateblue"
            | "slategray"
            | "slategrey"
            | "snow"
            | "springgreen"
            | "steelblue"
            | "tan"
            | "teal"
            | "thistle"
            | "tomato"
            | "turquoise"
            | "violet"
            | "wheat"
            | "white"
            | "whitesmoke"
            | "yellow"
            | "yellowgreen";
          //  @example [300, 70] @constraints  object: multiple: false
          hs_color?: [number, number];
          //  @example [0.52, 0.43] @constraints  object: multiple: false
          xy_color?: [number, number];
          //  @constraints  color_temp: unit: mired, min: 153, max: 500
          color_temp?: number;
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          brightness?: number;
          //  @constraints  number: min: -225, max: 255, step: 1, mode: slider
          brightness_step?: number;
          //
          white?: boolean;
          //  @example relax
          profile?: string;
          //
          flash?: "long" | "short";
        }
      >;
      // undefined
      turnOff: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //
          flash?: "long" | "short";
        }
      >;
      // undefined
      toggle: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //  @example [255, 100, 100] @constraints  color_rgb:
          rgb_color?: [number, number, number];
          //  @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: number;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_pct?: number;
          //
          effect?: string;
          //  @example [255, 100, 100, 50] @constraints  object: multiple: false
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70] @constraints  object: multiple: false
          rgbww_color?: [number, number, number, number, number];
          //
          color_name?:
            | "homeassistant"
            | "aliceblue"
            | "antiquewhite"
            | "aqua"
            | "aquamarine"
            | "azure"
            | "beige"
            | "bisque"
            | "blanchedalmond"
            | "blue"
            | "blueviolet"
            | "brown"
            | "burlywood"
            | "cadetblue"
            | "chartreuse"
            | "chocolate"
            | "coral"
            | "cornflowerblue"
            | "cornsilk"
            | "crimson"
            | "cyan"
            | "darkblue"
            | "darkcyan"
            | "darkgoldenrod"
            | "darkgray"
            | "darkgreen"
            | "darkgrey"
            | "darkkhaki"
            | "darkmagenta"
            | "darkolivegreen"
            | "darkorange"
            | "darkorchid"
            | "darkred"
            | "darksalmon"
            | "darkseagreen"
            | "darkslateblue"
            | "darkslategray"
            | "darkslategrey"
            | "darkturquoise"
            | "darkviolet"
            | "deeppink"
            | "deepskyblue"
            | "dimgray"
            | "dimgrey"
            | "dodgerblue"
            | "firebrick"
            | "floralwhite"
            | "forestgreen"
            | "fuchsia"
            | "gainsboro"
            | "ghostwhite"
            | "gold"
            | "goldenrod"
            | "gray"
            | "green"
            | "greenyellow"
            | "grey"
            | "honeydew"
            | "hotpink"
            | "indianred"
            | "indigo"
            | "ivory"
            | "khaki"
            | "lavender"
            | "lavenderblush"
            | "lawngreen"
            | "lemonchiffon"
            | "lightblue"
            | "lightcoral"
            | "lightcyan"
            | "lightgoldenrodyellow"
            | "lightgray"
            | "lightgreen"
            | "lightgrey"
            | "lightpink"
            | "lightsalmon"
            | "lightseagreen"
            | "lightskyblue"
            | "lightslategray"
            | "lightslategrey"
            | "lightsteelblue"
            | "lightyellow"
            | "lime"
            | "limegreen"
            | "linen"
            | "magenta"
            | "maroon"
            | "mediumaquamarine"
            | "mediumblue"
            | "mediumorchid"
            | "mediumpurple"
            | "mediumseagreen"
            | "mediumslateblue"
            | "mediumspringgreen"
            | "mediumturquoise"
            | "mediumvioletred"
            | "midnightblue"
            | "mintcream"
            | "mistyrose"
            | "moccasin"
            | "navajowhite"
            | "navy"
            | "navyblue"
            | "oldlace"
            | "olive"
            | "olivedrab"
            | "orange"
            | "orangered"
            | "orchid"
            | "palegoldenrod"
            | "palegreen"
            | "paleturquoise"
            | "palevioletred"
            | "papayawhip"
            | "peachpuff"
            | "peru"
            | "pink"
            | "plum"
            | "powderblue"
            | "purple"
            | "red"
            | "rosybrown"
            | "royalblue"
            | "saddlebrown"
            | "salmon"
            | "sandybrown"
            | "seagreen"
            | "seashell"
            | "sienna"
            | "silver"
            | "skyblue"
            | "slateblue"
            | "slategray"
            | "slategrey"
            | "snow"
            | "springgreen"
            | "steelblue"
            | "tan"
            | "teal"
            | "thistle"
            | "tomato"
            | "turquoise"
            | "violet"
            | "wheat"
            | "white"
            | "whitesmoke"
            | "yellow"
            | "yellowgreen";
          //  @example [300, 70] @constraints  object: multiple: false
          hs_color?: [number, number];
          //  @example [0.52, 0.43] @constraints  object: multiple: false
          xy_color?: [number, number];
          //  @constraints  color_temp: unit: mired, min: 153, max: 500
          color_temp?: number;
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          brightness?: number;
          //
          white?: boolean;
          //  @example relax
          profile?: string;
          //
          flash?: "long" | "short";
        }
      >;
    };
    scene: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      apply: ServiceFunction<
        object,
        T,
        {
          //  @example light.kitchen: 'on' light.ceiling:   state: 'on'   brightness: 80  @constraints  object: multiple: false
          entities: object;
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
        }
      >;
      // undefined
      create: ServiceFunction<
        object,
        T,
        {
          //  @example all_lights
          scene_id: string;
          //  @example light.tv_back_light: 'on' light.ceiling:   state: 'on'   brightness: 200  @constraints  object: multiple: false
          entities?: object;
          //  @example - light.ceiling - light.kitchen
          snapshot_entities?: string;
        }
      >;
      // undefined
      delete: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
        }
      >;
    };
    assistSatellite: {
      // undefined
      announce: ServiceFunction<
        object,
        T,
        {
          //  @example Time to wake up!
          message?: string;
          //  @constraints  media: accept: audio/*
          media_id?: unknown;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*
          preannounce_media_id?: unknown;
        }
      >;
      // undefined
      startConversation: ServiceFunction<
        object,
        T,
        {
          //  @example You left the lights on in the living room. Turn them off?
          start_message?: string;
          //  @constraints  media: accept: audio/*
          start_media_id?: unknown;
          //
          extra_system_prompt?: string;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*
          preannounce_media_id?: unknown;
        }
      >;
      // undefined
      askQuestion: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example What kind of music would you like to play?
          question?: string;
          //  @constraints  media: accept: audio/*
          question_media_id?: unknown;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*
          preannounce_media_id?: unknown;
          //  @constraints  object: label_field: sentences, description_field: id, multiple: true, translation_key: answers, fields: [object Object]
          answers?: object;
        }
      >;
    };
    zone: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    logbook: {
      // undefined
      log: ServiceFunction<
        object,
        T,
        {
          //  @example Kitchen
          name: string;
          //  @example is being used
          message: string;
          //
          entity_id?: string;
          //  @example light
          domain?: string;
        }
      >;
    };
    inputSelect: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      selectFirst: ServiceFunction<object, T, object>;
      // undefined
      selectLast: ServiceFunction<object, T, object>;
      // undefined
      selectNext: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      selectOption: ServiceFunction<
        object,
        T,
        {
          //  @example 'Item A' @constraints  state: hide_states: unavailable,unknown, multiple: false
          option: unknown;
        }
      >;
      // undefined
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      setOptions: ServiceFunction<
        object,
        T,
        {
          //  @example ['Item A', 'Item B', 'Item C']
          options: string;
        }
      >;
    };
    inputButton: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      press: ServiceFunction<object, T, object>;
    };
    inputNumber: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, step: 0.001, mode: box
          value: number;
        }
      >;
      // undefined
      increment: ServiceFunction<object, T, object>;
      // undefined
      decrement: ServiceFunction<object, T, object>;
    };
    script: {
      //
      gamingLightColorChanger: ServiceFunction<object, T, object>;
      //
      randomLightColour: ServiceFunction<object, T, object>;
      //
      saySomething: ServiceFunction<object, T, object>;
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    inputBoolean: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    timer: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      start: ServiceFunction<
        object,
        T,
        {
          //  @example 00:01:00 or 60
          duration?: string;
        }
      >;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      cancel: ServiceFunction<object, T, object>;
      // undefined
      finish: ServiceFunction<object, T, object>;
      // undefined
      change: ServiceFunction<
        object,
        T,
        {
          //  @example 00:01:00, 60 or -60
          duration: string;
        }
      >;
    };
    person: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    vacuum: {
      // undefined
      start: ServiceFunction<object, T, object>;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      returnToBase: ServiceFunction<object, T, object>;
      // undefined
      cleanSpot: ServiceFunction<object, T, object>;
      // undefined
      locate: ServiceFunction<object, T, object>;
      // undefined
      stop: ServiceFunction<object, T, object>;
      // undefined
      setFanSpeed: ServiceFunction<
        object,
        T,
        {
          //  @example low
          fan_speed: string;
        }
      >;
      // undefined
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //  @example set_dnd_timer
          command: string;
          //  @example { 'key': 'value' } @constraints  object: multiple: false
          params?: object;
        }
      >;
    };
    alarmControlPanel: {
      // undefined
      alarmDisarm: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmHome: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmAway: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmNight: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmVacation: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmCustomBypass: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmTrigger: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
    };
    lock: {
      // undefined
      unlock: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      lock: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      open: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
    };
    cover: {
      // undefined
      openCover: ServiceFunction<object, T, object>;
      // undefined
      closeCover: ServiceFunction<object, T, object>;
      // undefined
      setCoverPosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          position: number;
        }
      >;
      // undefined
      stopCover: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      openCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      closeCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      stopCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      setCoverTiltPosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          tilt_position: number;
        }
      >;
      // undefined
      toggleCoverTilt: ServiceFunction<object, T, object>;
    };
    valve: {
      // undefined
      openValve: ServiceFunction<object, T, object>;
      // undefined
      closeValve: ServiceFunction<object, T, object>;
      // undefined
      setValvePosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          position: number;
        }
      >;
      // undefined
      stopValve: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    lawnMower: {
      // undefined
      startMowing: ServiceFunction<object, T, object>;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      dock: ServiceFunction<object, T, object>;
    };
    cast: {
      // undefined
      showLovelaceView: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example lovelace-cast
          dashboard_path?: string;
          //  @example downstairs
          view_path: string;
        }
      >;
    };
    reolink: {
      // undefined
      playChime: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //
          ringtone:
            | "citybird"
            | "originaltune"
            | "pianokey"
            | "loop"
            | "attraction"
            | "hophop"
            | "goodday"
            | "operetta"
            | "moonlight"
            | "waybackhome";
        }
      >;
      // undefined
      ptzMove: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 64, step: 1, mode: slider
          speed: number;
        }
      >;
    };
    schedule: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      getSchedule: ServiceFunction<object, T, object>;
    };
    mqtt: {
      // undefined
      publish: ServiceFunction<
        object,
        T,
        {
          //  @example /homeassistant/hello
          topic: string;
          //  @example The temperature is {{ states('sensor.temperature') }} @constraints  template:
          payload?: unknown;
          //  @constraints  boolean:
          evaluate_payload?: boolean;
          //
          qos?: "0" | "1" | "2";
          //  @constraints  boolean:
          retain?: boolean;
        }
      >;
      // undefined
      dump: ServiceFunction<
        object,
        T,
        {
          //  @example OpenZWave/#
          topic?: string;
          //  @constraints  number: min: 1, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
        }
      >;
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    deconz: {
      // undefined
      configure: ServiceFunction<
        object,
        T,
        {
          //
          entity?: string;
          //  @example '/lights/1/state' or '/state'
          field?: string;
          //  @example {'on': true} @constraints  object: multiple: false
          data: object;
          //  @example 00212EFFFF012345
          bridgeid?: string;
        }
      >;
      // undefined
      deviceRefresh: ServiceFunction<
        object,
        T,
        {
          //  @example 00212EFFFF012345
          bridgeid?: string;
        }
      >;
      // undefined
      removeOrphanedEntries: ServiceFunction<
        object,
        T,
        {
          //  @example 00212EFFFF012345
          bridgeid?: string;
        }
      >;
    };
    mediaExtractor: {
      // undefined
      extractMediaUrl: ServiceFunction<
        object,
        T,
        {
          //  @example https://www.youtube.com/watch?v=dQw4w9WgXcQ
          url: string;
          //  @example best
          format_query?: string;
        }
      >;
      // undefined
      playMedia: ServiceFunction<
        object,
        T,
        {
          //  @example https://soundcloud.com/bruttoband/brutto-11
          media_content_id: string | number;
          //
          media_content_type:
            | "CHANNEL"
            | "EPISODE"
            | "PLAYLIST MUSIC"
            | "MUSIC"
            | "TVSHOW"
            | "VIDEO";
        }
      >;
    };
    file: {
      // undefined
      readFile: ServiceFunction<
        object,
        T,
        {
          //  @example www/my_file.json
          file_name?: string;
          //  @example JSON
          file_encoding?: "JSON" | "YAML";
        }
      >;
    };
    localtuya: {
      // Reload localtuya and reconnect to all devices.
      reload: ServiceFunction<object, T, object>;
      // Change the value of a datapoint (DP)
      setDp: ServiceFunction<
        object,
        T,
        {
          // The device ID of the device where the datapoint value needs to be changed @example 11100118278aab4de001
          device_id: string;
          // Target DP, Datapoint index @example 1 @constraints  number: mode: box, step: 1
          dp?: number;
          // A new value to set or a list of DP-value pairs. If a list is provided, the target DP will be ignored @example { '1': True, '2': True } @constraints  object: multiple: false
          value: object;
        }
      >;
    };
    inputDatetime: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setDatetime: ServiceFunction<
        object,
        T,
        {
          //  @example '2019-04-20'
          date?: string;
          //  @example '05:04:20' @constraints  time:
          time?: string;
          //  @example '2019-04-20 05:04:20'
          datetime?: string;
          //  @constraints  number: min: 0, max: 9223372036854776000, mode: box, step: 1
          timestamp?: number;
        }
      >;
    };
    restCommand: {
      // undefined
      assistantRelay: ServiceFunction<object, T, object>;
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    counter: {
      // undefined
      increment: ServiceFunction<object, T, object>;
      // undefined
      decrement: ServiceFunction<object, T, object>;
      // undefined
      reset: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, mode: box, step: 1
          value: number;
        }
      >;
    };
    inputText: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example This is an example text
          value: string;
        }
      >;
    };
    profiler: {
      // undefined
      start: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          seconds?: number;
        }
      >;
      // undefined
      memory: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          seconds?: number;
        }
      >;
      // undefined
      startLogObjects: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          scan_interval?: number;
        }
      >;
      // undefined
      stopLogObjects: ServiceFunction<object, T, object>;
      // undefined
      startLogObjectSources: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          scan_interval?: number;
          //  @constraints  number: min: 1, max: 30, unit_of_measurement: objects, step: 1, mode: slider
          max_objects?: number;
        }
      >;
      // undefined
      stopLogObjectSources: ServiceFunction<object, T, object>;
      // undefined
      dumpLogObjects: ServiceFunction<
        object,
        T,
        {
          //  @example State
          type: string;
        }
      >;
      // undefined
      dumpSockets: ServiceFunction<object, T, object>;
      // undefined
      lruStats: ServiceFunction<object, T, object>;
      // undefined
      logThreadFrames: ServiceFunction<object, T, object>;
      // undefined
      logEventLoopScheduled: ServiceFunction<object, T, object>;
      // undefined
      setAsyncioDebug: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          enabled?: boolean;
        }
      >;
      // undefined
      logCurrentTasks: ServiceFunction<object, T, object>;
    };
    commandLine: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    template: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    calendar: {
      // undefined
      createEvent: ServiceFunction<
        object,
        T,
        {
          //  @example Department Party
          summary: string;
          //  @example Meeting to provide technical review for 'Phoenix' design.
          description?: string;
          //  @example 2022-03-22 20:00:00 @constraints  datetime:
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00 @constraints  datetime:
          end_date_time?: string;
          //  @example 2022-03-22 @constraints  date:
          start_date?: string;
          //  @example 2022-03-23 @constraints  date:
          end_date?: string;
          //  @example {'days': 2} or {'weeks': 2}
          in?: object;
          //  @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
      // undefined
      getEvents: ServiceFunction<
        object,
        T,
        {
          //  @example 2022-03-22 20:00:00 @constraints  datetime:
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00 @constraints  datetime:
          end_date_time?: string;
          //  @constraints  duration:
          duration?: {
            hours?: number;
            days?: number;
            minutes?: number;
            seconds?: number;
          };
        }
      >;
    };
    notify: {
      // undefined
      sendMessage: ServiceFunction<
        object,
        T,
        {
          //
          message: string;
          //
          title?: string;
        }
      >;
      // undefined
      persistentNotification: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific @constraints  object: multiple: false
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_natashas_iphone integration.
      mobileAppNatashasIphone: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_sm_t220 integration.
      mobileAppSmT220: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_shannons_phone integration.
      mobileAppShannonsPhone: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_iphone integration.
      mobileAppIphone: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_galaxy_watch6_classic_yjfx integration.
      mobileAppGalaxyWatch6ClassicYjfx: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_shans_s25 integration.
      mobileAppShansS25: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the notify service.
      notify: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the google_assistant_sdk service.
      googleAssistantSdk: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
    };
    googleAssistantSdk: {
      // undefined
      sendTextCommand: ServiceFunction<
        object,
        T,
        {
          //  @example turn off kitchen TV
          command?: string;
          //  @example media_player.living_room_speaker
          media_player?: string;
        }
      >;
    };
    climate: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      setHvacMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  state: hide_states: unavailable,unknown, multiple: false
          hvac_mode?: unknown;
        }
      >;
      // undefined
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          //  @example away
          preset_mode: string;
        }
      >;
      // undefined
      setTemperature: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          temperature?: number;
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_high?: number;
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_low?: number;
          //
          hvac_mode?:
            | "off"
            | "auto"
            | "cool"
            | "dry"
            | "fan_only"
            | "heat_cool"
            | "heat";
        }
      >;
      // undefined
      setHumidity: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 30, max: 99, unit_of_measurement: %, step: 1, mode: slider
          humidity: number;
        }
      >;
      // undefined
      setFanMode: ServiceFunction<
        object,
        T,
        {
          //  @example low
          fan_mode: string;
        }
      >;
      // undefined
      setSwingMode: ServiceFunction<
        object,
        T,
        {
          //  @example on
          swing_mode: string;
        }
      >;
      // undefined
      setSwingHorizontalMode: ServiceFunction<
        object,
        T,
        {
          //  @example on
          swing_horizontal_mode: string;
        }
      >;
    };
    deviceTracker: {
      // undefined
      see: ServiceFunction<
        object,
        T,
        {
          //  @example FF:FF:FF:FF:FF:FF
          mac?: string;
          //  @example phonedave
          dev_id?: string;
          //  @example Dave
          host_name?: string;
          //  @example home
          location_name?: string;
          //  @example [51.509802, -0.086692] @constraints  object: multiple: false
          gps?: object;
          //  @constraints  number: min: 0, mode: box, unit_of_measurement: m, step: 1
          gps_accuracy?: number;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          battery?: number;
        }
      >;
    };
    button: {
      // undefined
      press: ServiceFunction<object, T, object>;
    };
    number: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example 42
          value: string;
        }
      >;
    };
    select: {
      // undefined
      selectFirst: ServiceFunction<object, T, object>;
      // undefined
      selectLast: ServiceFunction<object, T, object>;
      // undefined
      selectNext: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      selectOption: ServiceFunction<
        object,
        T,
        {
          //  @example 'Item A' @constraints  state: hide_states: unavailable,unknown, multiple: false
          option: unknown;
        }
      >;
      // undefined
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
    };
    text: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example Hello world!
          value: string;
        }
      >;
    };
    siren: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @example fire
          tone?: string;
          //  @example 0.5 @constraints  number: min: 0, max: 1, step: 0.05, mode: slider
          volume_level?: number;
          //  @example 15
          duration?: string;
        }
      >;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    remote: {
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @example BedroomTV
          activity?: string;
        }
      >;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //  @example 32756745
          device?: string;
          //  @example Play @constraints  object: multiple: false
          command: object;
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          num_repeats?: number;
          //  @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds, mode: slider
          delay_secs?: number;
          //  @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds, mode: slider
          hold_secs?: number;
        }
      >;
      // undefined
      learnCommand: ServiceFunction<
        object,
        T,
        {
          //  @example television
          device?: string;
          //  @example Turn on @constraints  object: multiple: false
          command?: object;
          //
          command_type?: "ir" | "rf";
          //  @constraints  boolean:
          alternative?: boolean;
          //  @constraints  number: min: 0, max: 60, step: 5, unit_of_measurement: seconds, mode: slider
          timeout?: number;
        }
      >;
      // undefined
      deleteCommand: ServiceFunction<
        object,
        T,
        {
          //  @example television
          device?: string;
          //  @example Mute @constraints  object: multiple: false
          command: object;
        }
      >;
    };
    fan: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage?: number;
          //  @example auto
          preset_mode?: string;
        }
      >;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      increaseSpeed: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage_step?: number;
        }
      >;
      // undefined
      decreaseSpeed: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage_step?: number;
        }
      >;
      // undefined
      oscillate: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          oscillating: boolean;
        }
      >;
      // undefined
      setDirection: ServiceFunction<
        object,
        T,
        {
          //
          direction: "forward" | "reverse";
        }
      >;
      // undefined
      setPercentage: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage: number;
        }
      >;
      // undefined
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          //  @example auto
          preset_mode: string;
        }
      >;
    };
    humidifier: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      setMode: ServiceFunction<
        object,
        T,
        {
          //  @example away
          mode: string;
        }
      >;
      // undefined
      setHumidity: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          humidity: number;
        }
      >;
    };
    waterHeater: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      setAwayMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          away_mode: boolean;
        }
      >;
      // undefined
      setTemperature: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 250, step: 0.5, mode: box, unit_of_measurement: °
          temperature: number;
          //  @example eco
          operation_mode?: string;
        }
      >;
      // undefined
      setOperationMode: ServiceFunction<
        object,
        T,
        {
          //  @example eco
          operation_mode: string;
        }
      >;
    };
    weather: {
      // undefined
      getForecasts: ServiceFunction<
        object,
        T,
        {
          //
          type: "daily" | "hourly" | "twice_daily";
        }
      >;
    };
    onvif: {
      // undefined
      ptz: ServiceFunction<
        object,
        T,
        {
          //
          tilt?: "DOWN" | "UP";
          //
          pan?: "LEFT" | "RIGHT";
          //
          zoom?: "ZOOM_IN" | "ZOOM_OUT";
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          distance?: number;
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          speed?: number;
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          continuous_duration?: number;
          //  @example 1
          preset?: string;
          //
          move_mode?:
            | "AbsoluteMove"
            | "ContinuousMove"
            | "GotoPreset"
            | "RelativeMove"
            | "Stop";
        }
      >;
    };
    tplink: {
      // undefined
      randomEffect: ServiceFunction<
        object,
        T,
        {
          //  @example 199,99,96 @constraints  object: multiple: false
          init_states: object;
          //  @example - [199, 89, 50] - [160, 50, 50] - [180, 100, 50]  @constraints  object: multiple: false
          backgrounds?: object;
          //  @example 0, 2, 4, 6, 8 @constraints  object: multiple: false
          segments?: object;
          //  @example 90 @constraints  number: min: 1, step: 1, max: 100, unit_of_measurement: %, mode: slider
          brightness?: number;
          //  @constraints  number: min: 0, step: 1, max: 5000, unit_of_measurement: ms, mode: slider
          duration?: number;
          //  @example 2000 @constraints  number: min: 0, step: 1, max: 6000, unit_of_measurement: ms, mode: slider
          transition?: number;
          //  @example 2000 @constraints  number: min: 0, step: 1, max: 3000, unit_of_measurement: ms, mode: slider
          fadeoff?: number;
          //  @example 340, 360 @constraints  object: multiple: false
          hue_range?: object;
          //  @example 40, 95 @constraints  object: multiple: false
          saturation_range?: object;
          //  @example 90, 100 @constraints  object: multiple: false
          brightness_range?: object;
          //  @example 2000, 6000 @constraints  object: multiple: false
          transition_range?: object;
          //  @example 80 @constraints  number: min: 1, step: 1, max: 600, mode: slider
          random_seed?: number;
        }
      >;
      // undefined
      sequenceEffect: ServiceFunction<
        object,
        T,
        {
          //  @example - [340, 20, 50] - [20, 50, 50] - [0, 100, 50]  @constraints  object: multiple: false
          sequence: object;
          //  @example 0, 2, 4, 6, 8 @constraints  object: multiple: false
          segments?: object;
          //  @example 80 @constraints  number: min: 1, step: 1, max: 100, unit_of_measurement: %, mode: slider
          brightness?: number;
          //  @constraints  number: min: 0, step: 1, max: 5000, unit_of_measurement: ms, mode: slider
          duration?: number;
          //  @constraints  number: min: 0, step: 1, max: 10, mode: slider
          repeat_times?: number;
          //  @example 2000 @constraints  number: min: 0, step: 1, max: 6000, unit_of_measurement: ms, mode: slider
          transition?: number;
          //  @example 1 @constraints  number: min: 0, step: 1, max: 16, mode: slider
          spread?: number;
          //  @example 1 @constraints  number: min: 1, step: 1, max: 4, mode: slider
          direction?: number;
        }
      >;
    };
    fullyKiosk: {
      // undefined
      loadUrl: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example https://home-assistant.io
          url: string;
        }
      >;
      // undefined
      startApplication: ServiceFunction<
        object,
        T,
        {
          //  @example de.ozerov.fully
          application: string;
          //
          device_id: string;
        }
      >;
      // undefined
      setConfig: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example motionSensitivity
          key: string;
          //  @example 90
          value: string;
        }
      >;
    };
    google: {
      // undefined
      createEvent: ServiceFunction<
        object,
        T,
        {
          //  @example Bowling
          summary: string;
          //  @example Birthday bowling
          description?: string;
          //  @example 2022-03-22 20:00:00
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00
          end_date_time?: string;
          //  @example 2022-03-10
          start_date?: string;
          //  @example 2022-03-11
          end_date?: string;
          //  @example 'days': 2 or 'weeks': 2 @constraints  object: multiple: false
          in?: object;
          //  @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
    };
    automation: {
      // undefined
      trigger: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          skip_condition?: boolean;
        }
      >;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          stop_actions?: boolean;
        }
      >;
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    samsungtvSmart: {
      // Send to samsung TV the command to change picture mode.
      selectPictureMode: ServiceFunction<
        object,
        T,
        {
          // Name of the target entity @example media_player.tv
          entity_id: string;
          // Name of the picture mode to switch to. Possible options can be found in the picture_mode_list state attribute. @example Standard
          picture_mode: string;
        }
      >;
      // Send to samsung TV the command to set art mode.
      setArtMode: ServiceFunction<
        object,
        T,
        {
          // Name of the target entity @example media_player.tv
          entity_id: string;
        }
      >;
    };
    zha: {
      // undefined
      permit: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 254, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee?: string;
          //  @example 00:0a:bf:00:01:10:23:35
          source_ieee?: string;
          //  @example 1234-5678-1234-5678-AABB-CCDD-AABB-CCDD-EEFF
          install_code?: string;
          //  @example Z:000D6FFFFED4163B$I:52797BF4A5084DAA8E1712B61741CA024051
          qr_code?: string;
        }
      >;
      // undefined
      remove: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
        }
      >;
      // undefined
      setZigbeeClusterAttribute: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 1, max: 65535, mode: box, step: 1
          endpoint_id: number;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          cluster_id: number;
          //
          cluster_type?: "in" | "out";
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          attribute: number;
          //  @example 1
          value: string;
          //  @example 252
          manufacturer?: string;
        }
      >;
      // undefined
      issueZigbeeClusterCommand: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          endpoint_id: number;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          cluster_id: number;
          //
          cluster_type?: "in" | "out";
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          command: number;
          //
          command_type: "client" | "server";
          //  @example [arg1, arg2, argN] @constraints  object: multiple: false
          args?: object;
          //  @constraints  object: multiple: false
          params?: object;
          //  @example 252
          manufacturer?: string;
        }
      >;
      // undefined
      issueZigbeeGroupCommand: ServiceFunction<
        object,
        T,
        {
          //  @example 546
          group: string;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          cluster_id: number;
          //
          cluster_type?: "in" | "out";
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          command: number;
          //  @example [arg1, arg2, argN] @constraints  object: multiple: false
          args?: object;
          //  @example 252
          manufacturer?: string;
        }
      >;
      // undefined
      warningDeviceSquawk: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 0, max: 1, mode: box, step: 1
          mode?: number;
          //  @constraints  number: min: 0, max: 1, mode: box, step: 1
          strobe?: number;
          //  @constraints  number: min: 0, max: 3, mode: box, step: 1
          level?: number;
        }
      >;
      // undefined
      warningDeviceWarn: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 0, max: 6, mode: box, step: 1
          mode?: number;
          //  @constraints  number: min: 0, max: 1, mode: box, step: 1
          strobe?: number;
          //  @constraints  number: min: 0, max: 3, mode: box, step: 1
          level?: number;
          //  @constraints  number: min: 0, max: 65535, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
          //  @constraints  number: min: 0, max: 100, step: 10, mode: slider
          duty_cycle?: number;
          //  @constraints  number: min: 0, max: 3, mode: box, step: 1
          intensity?: number;
        }
      >;
      // undefined
      setLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
          //  @example 1234
          user_code: string;
        }
      >;
      // undefined
      enableLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
        }
      >;
      // undefined
      disableLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
        }
      >;
      // undefined
      clearLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
        }
      >;
    };
  }
  export interface CustomEntityNameContainer {
    names:
      | "update.home_assistant_supervisor_update"
      | "update.home_assistant_core_update"
      | "update.file_editor_update"
      | "update.mosquitto_broker_update"
      | "update.rpc_shutdown_update"
      | "update.zigbee2mqtt_update"
      | "update.z_wave_js_update"
      | "update.deconz_update"
      | "update.node_red_update"
      | "update.home_assistant_google_drive_backup_update"
      | "update.ftp_update"
      | "update.samba_share_update"
      | "update.public_folders_update"
      | "update.piper_update"
      | "update.whisper_update"
      | "update.hakit_update"
      | "update.fusion_update"
      | "update.react_dashboard_update"
      | "update.advanced_ssh_web_terminal_update"
      | "update.hakit_dev_update"
      | "update.home_assistant_operating_system_update"
      | "conversation.home_assistant"
      | "sensor.time"
      | "sensor.date"
      | "event.backup_automatic_backup"
      | "sensor.backup_backup_manager_state"
      | "sensor.backup_next_scheduled_automatic_backup"
      | "sensor.backup_last_successful_automatic_backup"
      | "sensor.backup_last_attempted_automatic_backup"
      | "binary_sensor.remote_ui"
      | "stt.home_assistant_cloud"
      | "tts.home_assistant_cloud"
      | "scene.goodmorning"
      | "zone.home"
      | "script.gaming_light_color_changer"
      | "script.random_light_colour"
      | "script.say_something"
      | "input_boolean.game_time_boolean"
      | "timer.refresh_internal"
      | "switch.all_downstairs_light_switchs"
      | "switch.all_upstairs_lights"
      | "switch.all_lights"
      | "media_player.test_players"
      | "light.all_office_downlights"
      | "person.shannon_hochkins"
      | "person.natasha_hochkins"
      | "switch.gaming_pc_2"
      | "light.all_office_striplights"
      | "light.all_office_lights_2"
      | "cover.upstairs_curtains"
      | "cover.downstairs_curtains"
      | "cover.all_curtains"
      | "light.all_office_lights"
      | "sun.sun"
      | "sensor.sun_next_dawn"
      | "sensor.sun_next_dusk"
      | "sensor.sun_next_midnight"
      | "sensor.sun_next_noon"
      | "sensor.sun_next_rising"
      | "sensor.sun_next_setting"
      | "input_text.current_game_colour"
      | "input_text.current_work_colour"
      | "cover.garage_door_main"
      | "sensor.garage_door_main"
      | "calendar.homeassistant_calandar"
      | "media_player.dark_google_speaker"
      | "media_player.nestmini9243"
      | "media_player.office_hub"
      | "media_player.living_room_hub"
      | "sensor.disk_free"
      | "sensor.disk_use_percent"
      | "climate.air_conditioner"
      | "sensor.air_conditioner_inside_temperature"
      | "sensor.air_conditioner_outside_temperature"
      | "switch.air_conditioner_none"
      | "binary_sensor.natashas_iphone_focus"
      | "device_tracker.natashas_iphone"
      | "sensor.natashas_iphone_battery_state"
      | "sensor.natashas_iphone_battery_level"
      | "sensor.natashas_iphone_storage"
      | "sensor.natashas_iphone_ssid"
      | "sensor.natashas_iphone_bssid"
      | "sensor.natashas_iphone_geocoded_location"
      | "sensor.natashas_iphone_connection_type"
      | "sensor.natashas_iphone_sim_2"
      | "sensor.natashas_iphone_sim_1"
      | "sensor.natashas_iphone_last_update_trigger"
      | "sensor.natashas_iphone_distance"
      | "sensor.natashas_iphone_floors_ascended"
      | "sensor.natashas_iphone_activity"
      | "sensor.natashas_iphone_floors_descended"
      | "sensor.natashas_iphone_steps"
      | "sensor.natashas_iphone_average_active_pace"
      | "binary_sensor.samsung_10_tablet_is_charging"
      | "device_tracker.samsung_10_tablet"
      | "sensor.samsung_10_tablet_battery_health"
      | "sensor.samsung_10_tablet_battery_level"
      | "sensor.samsung_10_tablet_battery_state"
      | "sensor.samsung_10_tablet_battery_temperature"
      | "sensor.samsung_10_tablet_charger_type"
      | "sensor.sm_t220_battery_power"
      | "device_tracker.shannons_phone"
      | "sensor.shannons_phone_detected_activity"
      | "sensor.shannons_phone_sleep_confidence"
      | "sensor.shannons_phone_sleep_segment"
      | "sensor.shannons_phone_battery_level"
      | "sensor.shannons_phone_battery_state"
      | "sensor.shannons_phone_charger_type"
      | "binary_sensor.iphone_focus"
      | "device_tracker.iphone"
      | "sensor.iphone_activity"
      | "sensor.iphone_distance"
      | "sensor.iphone_floors_ascended"
      | "sensor.iphone_average_active_pace"
      | "sensor.iphone_steps"
      | "sensor.iphone_battery_level"
      | "sensor.iphone_battery_state"
      | "sensor.iphone_storage"
      | "sensor.iphone_floors_descended"
      | "sensor.iphone_ssid"
      | "sensor.iphone_bssid"
      | "sensor.iphone_sim_2"
      | "sensor.iphone_connection_type"
      | "sensor.iphone_sim_1"
      | "sensor.iphone_geocoded_location"
      | "sensor.iphone_last_update_trigger"
      | "sensor.iphone_app_version"
      | "sensor.iphone_location_permission"
      | "sensor.iphone_audio_output"
      | "sensor.iphone_watch_battery_level"
      | "sensor.iphone_watch_battery_state"
      | "device_tracker.galaxy_watch6_classic_yjfx"
      | "sensor.galaxy_watch6_classic_yjfx_battery_level"
      | "sensor.galaxy_watch6_classic_yjfx_battery_state"
      | "sensor.galaxy_watch6_classic_yjfx_charger_type"
      | "device_tracker.shans_s25"
      | "sensor.shans_s25_battery_level"
      | "sensor.shans_s25_battery_state"
      | "sensor.shans_s25_charger_type"
      | "button.garage_door_shelly_relay_reboot"
      | "switch.garage_door_shelly_relay"
      | "binary_sensor.backyard_motion"
      | "binary_sensor.backyard_person"
      | "binary_sensor.backyard_vehicle"
      | "binary_sensor.backyard_pet"
      | "camera.backyard_sub"
      | "number.backyard_zoom"
      | "number.backyard_focus"
      | "number.backyard_motion_sensitivity"
      | "number.backyard_ai_person_sensitivity"
      | "number.backyard_ai_vehicle_sensitivity"
      | "number.backyard_ai_pet_sensitivity"
      | "select.backyard_day_night_mode"
      | "sensor.backyard_day_night_state"
      | "switch.backyard_infra_red_lights_in_night_mode"
      | "switch.backyard_record_audio"
      | "switch.backyard_auto_focus"
      | "switch.backyard_email_on_event"
      | "switch.backyard_ftp_upload"
      | "switch.backyard_push_notifications"
      | "switch.backyard_record"
      | "update.backyard_firmware"
      | "binary_sensor.side_motion"
      | "binary_sensor.side_person"
      | "binary_sensor.side_vehicle"
      | "binary_sensor.side_pet"
      | "button.side_ptz_stop"
      | "button.side_ptz_left"
      | "button.side_ptz_right"
      | "button.side_ptz_up"
      | "button.side_ptz_down"
      | "button.side_guard_go_to"
      | "button.side_guard_set_current_position"
      | "camera.side_sub"
      | "light.side_floodlight"
      | "number.side_zoom"
      | "number.side_focus"
      | "number.side_floodlight_turn_on_brightness"
      | "number.side_volume"
      | "number.side_guard_return_time"
      | "number.side_motion_sensitivity"
      | "number.side_ai_person_sensitivity"
      | "number.side_ai_vehicle_sensitivity"
      | "number.side_ai_pet_sensitivity"
      | "number.side_auto_track_limit_left"
      | "number.side_auto_track_limit_right"
      | "number.side_auto_track_disappear_time"
      | "number.side_auto_track_stop_time"
      | "select.side_floodlight_mode"
      | "select.side_day_night_mode"
      | "select.side_ptz_preset"
      | "sensor.side_ptz_pan_position"
      | "sensor.side_ptz_tilt_position"
      | "sensor.side_day_night_state"
      | "siren.side_siren"
      | "switch.side_infra_red_lights_in_night_mode"
      | "switch.side_record_audio"
      | "switch.side_siren_on_event"
      | "switch.side_auto_tracking"
      | "switch.side_auto_focus"
      | "switch.side_guard_return"
      | "switch.side_email_on_event"
      | "switch.side_ftp_upload"
      | "switch.side_push_notifications"
      | "switch.side_record"
      | "update.side_firmware"
      | "binary_sensor.caravan_motion"
      | "binary_sensor.caravan_person"
      | "binary_sensor.caravan_vehicle"
      | "binary_sensor.caravan_pet"
      | "button.caravan_ptz_stop"
      | "button.caravan_ptz_left"
      | "button.caravan_ptz_right"
      | "button.caravan_ptz_up"
      | "button.caravan_ptz_down"
      | "button.caravan_guard_go_to"
      | "button.caravan_guard_set_current_position"
      | "camera.caravan_sub"
      | "light.caravan_floodlight"
      | "number.caravan_zoom"
      | "number.caravan_focus"
      | "number.caravan_floodlight_turn_on_brightness"
      | "number.caravan_volume"
      | "number.caravan_guard_return_time"
      | "number.caravan_motion_sensitivity"
      | "number.caravan_ai_person_sensitivity"
      | "number.caravan_ai_vehicle_sensitivity"
      | "number.caravan_ai_pet_sensitivity"
      | "number.caravan_auto_track_limit_left"
      | "number.caravan_auto_track_limit_right"
      | "number.caravan_auto_track_disappear_time"
      | "number.caravan_auto_track_stop_time"
      | "select.caravan_floodlight_mode"
      | "select.caravan_day_night_mode"
      | "sensor.caravan_ptz_pan_position"
      | "sensor.caravan_ptz_tilt_position"
      | "sensor.caravan_day_night_state"
      | "siren.caravan_siren"
      | "switch.caravan_infra_red_lights_in_night_mode"
      | "switch.caravan_record_audio"
      | "switch.caravan_siren_on_event"
      | "switch.caravan_auto_tracking"
      | "switch.caravan_auto_focus"
      | "switch.caravan_guard_return"
      | "switch.caravan_email_on_event"
      | "switch.caravan_ftp_upload"
      | "switch.caravan_push_notifications"
      | "switch.caravan_record"
      | "update.caravan_firmware"
      | "binary_sensor.front_door_ding"
      | "binary_sensor.front_door_motion_2"
      | "camera.front_door_live_view"
      | "event.front_door_ding"
      | "event.front_door_motion"
      | "number.upstairs_volume"
      | "number.front_door_volume"
      | "sensor.front_door_battery_2"
      | "sensor.front_door_last_activity"
      | "sensor.front_door_last_ding"
      | "sensor.front_door_last_motion"
      | "sensor.upstairs_volume"
      | "sensor.front_door_volume"
      | "siren.upstairs_siren"
      | "switch.front_door_motion_detection"
      | "remote.broadlink_remote_controller_remote"
      | "binary_sensor.dehumidifier_fault"
      | "binary_sensor.dehumidifer_timer_sensor"
      | "binary_sensor.dehumidifer_defrost"
      | "light.light_office_downlight_1"
      | "light.light_office_downlight_3"
      | "light.light_office_downlight_2"
      | "light.light_living_room_main"
      | "light.light_upstairs_living"
      | "light.light_kitchen_main"
      | "light.master_striplight_under_bed"
      | "light.light_office_roof"
      | "light.light_under_stairs"
      | "light.office_striplight_main"
      | "light.light_pantry"
      | "light.living_room_striplight_entertaining_unit"
      | "light.light_dining_room"
      | "number.dehumidifer_humidity_target"
      | "select.dehumifier_mode"
      | "select.dehumidifer_fan_speed"
      | "select.dehumidifer_timer"
      | "sensor.empty_tank"
      | "sensor.dehumidifer_temperature"
      | "sensor.dehumidifer_humidity"
      | "sensor.sensor_mode"
      | "sensor.sensitivity"
      | "sensor.duration"
      | "switch.switch_office_roof_light"
      | "switch.switch_office_striplights"
      | "switch.switch_office_downlights"
      | "switch.switch_office_cupboard_left"
      | "switch.switch_office_cupboard_right"
      | "switch.outdoor_bbq_switch"
      | "switch.switch_tablet_charger_on"
      | "switch.dehumidifier_power"
      | "switch.dehumidifer_night_mode"
      | "switch.switch_outdoor_kitchen_fridge"
      | "switch.switch_outdoor_kitchen_striplights"
      | "switch.patio_switch"
      | "switch.switch_living_room_light"
      | "switch.switch_outdoor_kitchen_roof_lights"
      | "switch.switch_outdoor_patio_lights"
      | "switch.switch_under_stairs_light"
      | "switch.stairs_bottom_dining"
      | "switch.stairs_bottom_pendant"
      | "switch.switch_main_hallway_linen_light"
      | "switch.switch_master_bedroom_main_switch"
      | "switch.switch_front_door_outdoor_lights"
      | "switch.switch_front_door_hallway_lights"
      | "switch.switch_pantry_vertical_garden"
      | "switch.switch_pantry_main"
      | "switch.switch_light_garage_main"
      | "switch.switch_light_stairway_upstairs"
      | "switch.switch_upstairs_stairway_livingroom_light"
      | "switch.switch_kitchen_pendant_light"
      | "switch.switch_kitchen_main_light"
      | "fan.master_bedroom_fan_speed"
      | "light.master_bedroom_fan_light"
      | "number.switch_2_gang_evies_room_switch_1_timer"
      | "number.switch_2_gang_evies_room_switch_2_timer"
      | "select.switch_2_gang_evies_room_power_on_behavior"
      | "switch.theo_s_light_fan_switch"
      | "switch.master_bedroom_fan_switch"
      | "switch.master_bedroom_wardrobe_light"
      | "switch.master_bedroom_exhaust_fan"
      | "switch.master_bedroom_bathroom_light"
      | "switch.switch_2_gang_evies_room_fan_switch"
      | "switch.switch_2_gang_evies_room_switch_night_light"
      | "sensor.home_assistant_v2_db_size"
      | "media_player.av_samsung_soundbar_q70r_2"
      | "binary_sensor.rpi_power_status"
      | "sensor.speedtest_ping"
      | "sensor.speedtest_download"
      | "sensor.speedtest_upload"
      | "weather.freesia"
      | "update.local_tuya_update_2"
      | "update.react_dashboard_update_2"
      | "update.hacs_update"
      | "update.node_red_companion_update"
      | "update.soliscloud_portal_integration_update"
      | "update.mini_media_player_update"
      | "update.samsungtv_smart_update"
      | "update.local_tuya_update"
      | "button.evies_camera_reboot"
      | "button.evies_camera_set_system_date_and_time"
      | "binary_sensor.evies_camera_cell_motion_detection"
      | "binary_sensor.evies_camera_face_detection"
      | "binary_sensor.evies_camera_person_detection"
      | "binary_sensor.evies_camera_vehicle_detection"
      | "binary_sensor.evies_camera_pet_detection"
      | "binary_sensor.evies_camera_motion_alarm"
      | "binary_sensor.evies_camera_motion_alarm_2"
      | "switch.evies_camera_autofocus"
      | "switch.evies_camera_ir_lamp"
      | "switch.evies_camera_wiper"
      | "binary_sensor.office_light_strip_2_cloud_connection"
      | "light.office_light_strip_2"
      | "select.office_light_strip_2_light_preset"
      | "sensor.office_light_strip_2_current_consumption"
      | "sensor.office_light_strip_2_today_s_consumption"
      | "sensor.office_light_strip_2_this_month_s_consumption"
      | "sensor.office_light_strip_2_total_consumption"
      | "binary_sensor.office_lightstrip_bottom_shelf_cloud_connection"
      | "light.office_lightstrip_bottom_shelf"
      | "select.office_lightstrip_bottom_shelf_light_preset"
      | "sensor.office_lightstrip_bottom_shelf_current_consumption"
      | "sensor.office_lightstrip_bottom_shelf_today_s_consumption"
      | "sensor.office_lightstrip_bottom_shelf_this_month_s_consumption"
      | "sensor.office_lightstrip_bottom_shelf_total_consumption"
      | "binary_sensor.office_light_strip_3_cloud_connection"
      | "light.office_light_strip_3"
      | "select.office_light_strip_3_light_preset"
      | "sensor.office_light_strip_3_current_consumption"
      | "sensor.office_light_strip_3_today_s_consumption"
      | "sensor.office_light_strip_3_this_month_s_consumption"
      | "sensor.office_light_strip_3_total_consumption"
      | "camera.evies_camera"
      | "sensor.camera_folder_size"
      | "button.safe_mode_boot"
      | "switch.game_switch_wall_panel"
      | "switch.work_switch_wall_panel"
      | "switch.off_switch_wall_panel"
      | "sensor.solis_power_state"
      | "sensor.solis_state"
      | "sensor.solis_timestamp_measurements_received"
      | "sensor.solis_hmi_version_all"
      | "sensor.solis_temperature"
      | "sensor.solis_dc_voltage_pv1"
      | "sensor.solis_dc_voltage_pv2"
      | "sensor.solis_dc_current_pv1"
      | "sensor.solis_dc_current_pv2"
      | "sensor.solis_dc_power_pv1"
      | "sensor.solis_dc_power_pv2"
      | "sensor.solis_ac_voltage_r"
      | "sensor.solis_ac_voltage_s"
      | "sensor.solis_ac_voltage_t"
      | "sensor.solis_ac_current_r"
      | "sensor.solis_ac_current_s"
      | "sensor.solis_ac_current_t"
      | "sensor.solis_ac_output_total_power"
      | "sensor.solis_ac_frequency"
      | "sensor.solis_energy_today"
      | "sensor.solis_energy_this_month"
      | "sensor.solis_energy_this_year"
      | "sensor.solis_energy_total"
      | "sensor.solis_battery_power"
      | "sensor.solis_battery_voltage"
      | "sensor.solis_battery_current"
      | "sensor.solis_remaining_battery_capacity"
      | "sensor.solis_total_energy_charged"
      | "sensor.solis_total_energy_discharged"
      | "sensor.solis_daily_energy_charged"
      | "sensor.solis_daily_energy_discharged"
      | "sensor.solis_monthly_energy_charged"
      | "sensor.solis_monthly_energy_discharged"
      | "sensor.solis_yearly_energy_charged"
      | "sensor.solis_yearly_energy_discharged"
      | "sensor.solis_daily_on_grid_energy"
      | "sensor.solis_daily_grid_energy_purchased"
      | "sensor.solis_daily_grid_energy_used"
      | "sensor.solis_monthly_grid_energy_purchased"
      | "sensor.solis_monthly_on_grid_energy"
      | "sensor.solis_yearly_grid_energy_purchased"
      | "sensor.solis_yearly_on_grid_energy"
      | "sensor.solis_total_on_grid_energy"
      | "sensor.solis_power_grid_total_power"
      | "sensor.solis_total_consumption_power"
      | "sensor.solis_total_energy_purchased"
      | "sensor.solis_total_energy_used"
      | "sensor.solis_grid_phase1_power"
      | "sensor.solis_grid_phase2_power"
      | "sensor.solis_grid_phase3_power"
      | "sensor.solis_grid_phase1_apparent_power"
      | "sensor.solis_grid_phase2_apparent_power"
      | "sensor.solis_grid_phase3_apparent_power"
      | "sensor.solis_grid_phase1_reactive_power"
      | "sensor.solis_grid_phase2_reactive_power"
      | "sensor.solis_grid_phase3_reactive_power"
      | "sensor.solis_plant_total_consumption_power"
      | "sensor.solis_battery_state_of_health"
      | "sensor.solis_force_charge_soc"
      | "sensor.solis_force_discharge_soc"
      | "sensor.solis_backup_load_power"
      | "sensor.solis_meter_item_a_current"
      | "sensor.solis_meter_item_a_volt"
      | "sensor.solis_meter_item_b_current"
      | "sensor.solis_meter_item_b_volt"
      | "sensor.solis_meter_item_c_current"
      | "sensor.solis_meter_item_c_volt"
      | "calendar.holidays_in_australia"
      | "calendar.leave"
      | "calendar.xyz_automation_team_calendar"
      | "calendar.shannon_hochkins_gumgum_com"
      | "calendar.birthdays_2"
      | "binary_sensor.roller_blind_office_running"
      | "binary_sensor.roller_blind_office_update_available"
      | "binary_sensor.roller_blind_office_charging_status"
      | "binary_sensor.roller_blind_master_primary_running"
      | "binary_sensor.roller_blind_master_primary_update_available"
      | "binary_sensor.roller_blind_master_primary_charging_status"
      | "binary_sensor.zigbee2mqtt_bridge_connection_state"
      | "button.zigbee2mqtt_bridge_restart"
      | "cover.roller_blind_office"
      | "cover.roller_blind_master_primary"
      | "binary_sensor.sb_motion_sensor_front_door_outside_motion_detected"
      | "binary_sensor.sb_motion_sensor_front_door_outside_light"
      | "sensor.sb_motion_sensor_front_door_outside_battery"
      | "binary_sensor.motion_sensor_1437_motion_detected"
      | "binary_sensor.motion_sensor_1437_light"
      | "sensor.motion_sensor_1437_battery"
      | "sensor.activity_calories"
      | "sensor.calories"
      | "sensor.distance"
      | "sensor.elevation"
      | "sensor.floors"
      | "sensor.resting_heart_rate"
      | "sensor.minutes_fairly_active"
      | "sensor.minutes_lightly_active"
      | "sensor.minutes_sedentary"
      | "sensor.minutes_very_active"
      | "sensor.steps"
      | "sensor.weight"
      | "sensor.awakenings_count"
      | "sensor.sleep_efficiency"
      | "sensor.minutes_after_wakeup"
      | "sensor.sleep_minutes_asleep"
      | "sensor.sleep_minutes_awake"
      | "sensor.sleep_minutes_to_fall_asleep"
      | "sensor.sleep_time_in_bed"
      | "sensor.calories_in"
      | "sensor.water"
      | "sensor.sleep_start_time"
      | "sensor.mobiletrack_battery"
      | "sensor.mobiletrack_battery_level"
      | "automation.office_lightstrips"
      | "automation.office_lightstrips_on"
      | "automation.office_downlights_on"
      | "automation.hallway_motion_turn_on_light"
      | "automation.under_stairs_open"
      | "automation.under_stairs_close"
      | "automation.garage_turn_on_lights_when_door_opens"
      | "automation.when_pantry_door_opens"
      | "automation.when_pantry_door_closes"
      | "automation.doorbell_rings"
      | "automation.front_door_opened"
      | "automation.stairs_motion_turn_on_light"
      | "automation.new_automation_4"
      | "automation.2_way_switch_stairs"
      | "automation.2_way_switch_top"
      | "automation.master_tv_turn_on_devices"
      | "automation.cpu_temperature_warning"
      | "automation.disc_space_warning"
      | "automation.new_automation"
      | "automation.turn_off_aircon_after_30mins"
      | "automation.turn_off_aircon_after_45_mins"
      | "automation.turn_off_aircon_after_60_mins"
      | "automation.push_button_2_office_lights"
      | "automation.on_homeassistant_restart"
      | "automation.patio_switch"
      | "automation.automation_27"
      | "automation.new_automation_2"
      | "automation.automatic_battery_charger"
      | "automation.evies_nightlight"
      | "automation.tv_toggle_light_strip"
      | "automation.turn_off_kids_fans"
      | "select.push_button_1_operation_mode"
      | "binary_sensor.fridge_fridge_door"
      | "binary_sensor.fridge_freezer_door"
      | "media_player.upstairs_living_room_tv"
      | "media_player.tv_master_bedroom"
      | "media_player.living_room_tv"
      | "media_player.av_samsung_soundbar_q70r_3"
      | "number.fridge_fridge_temperature"
      | "number.fridge_freezer_temperature"
      | "sensor.upstairs_living_room_tv_tv_channel"
      | "sensor.upstairs_living_room_tv_tv_channel_name"
      | "sensor.tv_master_bedroom_tv_channel"
      | "sensor.tv_master_bedroom_tv_channel_name"
      | "sensor.living_room_tv_tv_channel"
      | "sensor.living_room_tv_tv_channel_name"
      | "sensor.fridge_energy"
      | "sensor.fridge_power"
      | "sensor.fridge_energy_difference"
      | "sensor.fridge_power_energy"
      | "sensor.fridge_energy_saved"
      | "sensor.fridge_fridge_temperature"
      | "sensor.fridge_freezer_temperature"
      | "switch.fridge_cubed_ice"
      | "switch.fridge_power_cool"
      | "switch.fridge_power_freeze"
      | "select.push_button_2_operation_mode"
      | "select.zigbee2mqtt_bridge_log_level"
      | "select.roller_blind_office_motor_speed"
      | "select.roller_blind_master_primary_motor_speed"
      | "sensor.roller_blind_office_battery"
      | "sensor.roller_blind_office_motor_state"
      | "sensor.roller_blind_office_device_temperature"
      | "sensor.roller_blind_master_primary_battery"
      | "sensor.roller_blind_master_primary_motor_state"
      | "sensor.roller_blind_master_primary_device_temperature"
      | "sensor.push_button_1_action"
      | "sensor.push_button_1_battery"
      | "sensor.push_button_2_action"
      | "sensor.push_button_2_battery"
      | "sensor.zigbee2mqtt_bridge_version"
      | "sensor.zigbee2mqtt_bridge_permit_join_timeout"
      | "switch.zigbee2mqtt_bridge_permit_join"
      | "update.roller_blind_office"
      | "update.roller_blind_master_primary"
      | "media_player.samsung_tv_master_bedroom"
      | "media_player.samsung_tv_living_room"
      | "remote.samsung_tv_master_bedroom"
      | "remote.samsung_tv_living_room"
      | "binary_sensor.office_blind_charging"
      | "binary_sensor.office_blind_calibrated"
      | "binary_sensor.lumi_lumi_curtain_acn002_charging"
      | "binary_sensor.lumi_lumi_curtain_acn002_calibrated"
      | "button.office_blind_identify"
      | "button.lumi_lumi_curtain_acn002_identify"
      | "button.tz3000_ja5osu5g_ts004f_identify"
      | "button.tz3000_ja5osu5g_ts004f_identify_2"
      | "cover.office_blind_cover"
      | "cover.lumi_lumi_curtain_acn002_cover"
      | "select.office_blind_speed"
      | "select.lumi_lumi_curtain_acn002_speed"
      | "sensor.office_blind_battery"
      | "sensor.office_blind_device_temperature"
      | "sensor.office_blind_window_covering_type"
      | "sensor.lumi_lumi_curtain_acn002_battery"
      | "sensor.lumi_lumi_curtain_acn002_device_temperature"
      | "sensor.lumi_lumi_curtain_acn002_window_covering_type"
      | "sensor.tz3000_ja5osu5g_ts004f_battery"
      | "sensor.tz3000_ja5osu5g_ts004f_battery_2"
      | "switch.office_blind_inverted"
      | "switch.lumi_lumi_curtain_acn002_inverted"
      | "update.office_blind_firmware"
      | "update.lumi_lumi_curtain_acn002_firmware"
      | "update.tz3000_ja5osu5g_ts004f_firmware"
      | "update.tz3000_ja5osu5g_ts004f_firmware_2"
      | "switch.goodnight_switch"
      | "switch.goodmorning_switch"
      | "cover.sb_curtain_patio_main"
      | "sensor.sb_curtain_patio_main_battery"
      | "binary_sensor.sb_curtain_patio_main_calibration"
      | "sensor.sb_curtain_patio_main_light_level"
      | "cover.sb_curtain_pool_window"
      | "sensor.sb_curtain_pool_window_battery"
      | "binary_sensor.sb_curtain_pool_window_calibration"
      | "sensor.sb_curtain_pool_window_light_level"
      | "cover.sb_curtain_patio_secondary"
      | "sensor.sb_curtain_patio_secondary_battery"
      | "binary_sensor.sb_curtain_patio_secondary_calibration"
      | "sensor.sb_curtain_patio_secondary_light_level"
      | "cover.sb_curtain_office"
      | "sensor.sb_curtain_office_battery"
      | "binary_sensor.sb_curtain_office_calibration"
      | "sensor.sb_curtain_office_light_level"
      | "cover.sb_curtain_master_main"
      | "sensor.sb_curtain_master_main_battery"
      | "binary_sensor.sb_curtain_master_main_calibration"
      | "sensor.sb_curtain_master_main_light_level"
      | "cover.sb_curtain_bbq_window"
      | "sensor.sb_curtain_bbq_window_battery"
      | "binary_sensor.sb_curtain_bbq_window_calibration"
      | "sensor.sb_curtain_bbq_window_light_level"
      | "cover.curtain_master_small"
      | "sensor.curtain_master_small_battery"
      | "binary_sensor.curtain_master_small_calibration"
      | "sensor.curtain_master_small_light_level"
      | "stt.faster_whisper"
      | "tts.piper"
      | "remote.chome_cast"
      | "media_player.chome_cast_2"
      | "media_player.chrome_cast_stream"
      | "sensor.ac_outside_temperature"
      | "sensor.ac_inside_temperature"
      | "binary_sensor.shannon_s_tab_s7_kiosk_mode"
      | "binary_sensor.shannon_s_tab_s7_plugged_in"
      | "binary_sensor.shannon_s_tab_s7_device_admin"
      | "button.shannon_s_tab_s7_restart_browser"
      | "button.shannon_s_tab_s7_restart_device"
      | "button.shannon_s_tab_s7_bring_to_foreground"
      | "button.shannon_s_tab_s7_send_to_background"
      | "button.shannon_s_tab_s7_load_start_url"
      | "media_player.shannon_s_tab_s7"
      | "number.shannon_s_tab_s7_screensaver_timer"
      | "number.shannon_s_tab_s7_screensaver_brightness"
      | "number.shannon_s_tab_s7_screen_off_timer"
      | "number.shannon_s_tab_s7_screen_brightness"
      | "sensor.shannon_s_tab_s7_battery"
      | "sensor.shannon_s_tab_s7_current_page"
      | "sensor.shannon_s_tab_s7_screen_orientation"
      | "sensor.shannon_s_tab_s7_foreground_app"
      | "sensor.shannon_s_tab_s7_internal_storage_free_space"
      | "sensor.shannon_s_tab_s7_internal_storage_total_space"
      | "sensor.shannon_s_tab_s7_free_memory"
      | "sensor.shannon_s_tab_s7_total_memory"
      | "switch.shannon_s_tab_s7_screensaver"
      | "switch.shannon_s_tab_s7_maintenance_mode"
      | "switch.shannon_s_tab_s7_kiosk_lock"
      | "switch.shannon_s_tab_s7_motion_detection"
      | "switch.shannon_s_tab_s7_screen"
      | "calendar.birthdays"
      | "calendar.shannon_hochkins_playgroundxyz_com"
      | "number.backyard_volume"
      | "button.caravan_ptz_calibrate"
      | "button.side_ptz_calibrate"
      | "media_player.all_speakers"
      | "media_player.master_bedroom_speaker"
      | "media_player.living_room_speaker"
      | "media_player.office_display"
      | "media_player.kitchen_display"
      | "media_player.all_speakers_2"
      | "media_player.av_samsung_soundbar_q70r"
      | "device_tracker.2686f39c_bada_4658_854a_a62e7e5e8b8d_1_0"
      | "sensor.2686f39c_bada_4658_854a_a62e7e5e8b8d_1_0_estimated_distance"
      | "device_tracker.e2c56db5_dffb_48d2_b060_d0f5a71096e0_0_0_74a8"
      | "sensor.e2c56db5_dffb_48d2_b060_d0f5a71096e0_0_0_74a8_estimated_distance"
      | "device_tracker.sbba0dc9cd4d06ca2c_8b0b"
      | "sensor.sbba0dc9cd4d06ca2c_8b0b_estimated_distance"
      | "device_tracker.e20a39f4_73f5_4bc4_1864_17d1ad07a962_53078_8417_efeb"
      | "sensor.e20a39f4_73f5_4bc4_1864_17d1ad07a962_53078_8417_efeb_estimated_distance"
      | "device_tracker.om6g_10219v_ibc_1db5"
      | "sensor.om6g_10219v_ibc_1db5_estimated_distance"
      | "device_tracker.om6g_10219v_ibc_40c0"
      | "sensor.om6g_10219v_ibc_40c0_estimated_distance"
      | "camera.shannon_s_tab_s7"
      | "image.shannon_s_tab_s7_screenshot"
      | "notify.shannon_s_tab_s7_overlay_message"
      | "notify.shannon_s_tab_s7_text_to_speech"
      | "device_tracker.e2c56db5_dffb_48d2_b060_d0f5a71096e0_0_0_e1be"
      | "sensor.e2c56db5_dffb_48d2_b060_d0f5a71096e0_0_0_e1be_estimated_distance"
      | "device_tracker.e2c56db5_dffb_48d2_b060_d0f5a71096e0_0_0_cc2e"
      | "sensor.e2c56db5_dffb_48d2_b060_d0f5a71096e0_0_0_cc2e_estimated_distance"
      | "switch.music_assistant_pre_release"
      | "update.music_assistant_update"
      | "number.office_blind_number_current_position"
      | "number.lumi_lumi_curtain_acn002_number_current_position"
      | "button.theos_camera_reboot"
      | "button.theos_camera_set_system_date_and_time"
      | "camera.theos_camera_profile000_mainstream"
      | "switch.theos_camera_autofocus"
      | "switch.theos_camera_ir_lamp"
      | "switch.theos_camera_wiper"
      | "binary_sensor.theos_camera_face_detection"
      | "binary_sensor.theos_camera_cell_motion_detection"
      | "binary_sensor.theos_camera_vehicle_detection"
      | "binary_sensor.theos_camera_pet_detection"
      | "binary_sensor.theos_camera_motion_alarm"
      | "binary_sensor.theos_camera_person_detection"
      | "binary_sensor.theos_camera_motion_alarm_2"
      | "binary_sensor.garage_door_contact_sensor"
      | "binary_sensor.under_stairs_contact_sensor"
      | "binary_sensor.pantry_contact_sensor"
      | "binary_sensor.front_door_contact_sensor"
      | "sensor.garage_door_contact_sensor_battery"
      | "sensor.under_stairs_contact_sensor_battery"
      | "sensor.pantry_contact_sensor_battery"
      | "sensor.front_door_contact_sensor_battery"
      | "sensor.office_temperature_sensor"
      | "sensor.office_temperature_sensor_battery"
      | "sensor.office_temperature_sensor_2"
      | "sensor.office_temperature_sensor_3"
      | "sensor.living_room_temperature_sensor"
      | "sensor.living_room_temperature_sensor_battery"
      | "sensor.living_room_temperature_sensor_2"
      | "sensor.living_room_temperature_sensor_3"
      | "sensor.evies_room_temperature_sensor"
      | "sensor.evies_room_temperature_sensor_battery"
      | "sensor.evies_room_temperature_sensor_2"
      | "sensor.evies_room_temperature_sensor_3"
      | "sensor.master_bed_temperature_sensor"
      | "sensor.master_bed_temperature_sensor_battery"
      | "sensor.master_bed_temperature_sensor_2"
      | "sensor.master_bed_temperature_sensor_3"
      | "device_tracker.e20a39f4_73f5_4bc4_1864_17d1ad07a962_29963_52795_4eb0"
      | "sensor.e20a39f4_73f5_4bc4_1864_17d1ad07a962_29963_52795_4eb0_estimated_distance"
      | "scene.living_room_on"
      | "scene.living_room_off"
      | "binary_sensor.backups_stale"
      | "sensor.backup_state";
  }
}
