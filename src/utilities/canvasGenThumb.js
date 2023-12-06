export const captureImage = (video, canvas) => {
   if (video?.current) {
      const canvasCtx = canvas.current.getContext("2d");
      canvas.current.width = video.current.videoWidth;
      canvas.current.height = video.current.videoHeight;

      //   // Vẽ video lên canvas
      canvasCtx.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);

      //   // Lấy hình ảnh dưới dạng URL
      //   const imageSrc = canvas.current.toDataURL("image/png");

      //   // Đặt hình ảnh đã chụp
      //   setCapturedImage(imageSrc);
   }
};
