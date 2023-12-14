export const captureImage = (video, canvas, setPayload) => {
   if (video?.current) {
      const canvasCtx = canvas.current?.getContext("2d");
      canvas.current.width = video.current?.videoWidth;
      canvas.current.height = video.current?.videoHeight;

      //   // Vẽ video lên canvas
      canvasCtx.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);

      canvas.current.toBlob((blob) => {
         // Tạo đối tượng File từ Blob
         const imageFile = new File([blob], 'tiktok_image.png', { type: 'image/png' });

         // Gán đối tượng File vào state hoặc payload
         setPayload((prev) => ({
            ...prev,
            image: imageFile,
         }));
      }, 'image/png');

      //   // Đặt hình ảnh đã chụp
      //   setCapturedImage(imageSrc);
   }
};
