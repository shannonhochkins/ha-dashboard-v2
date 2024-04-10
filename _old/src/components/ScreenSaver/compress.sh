#!/bin/bash

for file in ./assets/originals/*.mp4; do
  # Extract filename without extension
  filename=$(basename -- "$file")
  filename="${filename%.*}"

  # Set the output path
  outputPath="./assets/${filename}.mp4"

  # Run FFmpeg, maximum width of 720px, blur the video, encode with H.264, constant rate factor of 23, 12 frames per second, 5 seconds long, no audio
  ffmpeg -i "$file" -vf "scale=-1:720" -c:v libx264 -crf 23 -r 15 -t 5 -an "$outputPath"
done