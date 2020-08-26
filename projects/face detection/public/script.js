Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
	faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
	faceapi.nets.faceExpressionNet.loadFromUri('/models') ])
  
  
var uploadedFile;
var btnUpload = $("#upload_file"),
		btnOuter = $(".button_outer");
	btnUpload.on("change", function(e){
		var ext = btnUpload.val().split('.').pop().toLowerCase();
		if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
			$(".error_msg").text("Not an Image...");
		} else {
			$(".error_msg").text("");
			btnOuter.addClass("file_uploading");
			setTimeout(function(){
				btnOuter.addClass("file_uploaded");
			},3000);
			 uploadedFile = URL.createObjectURL(e.target.files[0]);
			
    console.log("uploadedFile", uploadedFile)
			setTimeout(function(){
		
		
				$("#uploaded_view").append('<img src="'+uploadedFile+'" id="wer"/>').addClass("show");
		$('#b1').hide();
		$('#b2').show();
			},3500);
		}
	});
	$(".file_remove").on("click", function(e){
		$("#uploaded_view").removeClass("show");
		$("#uploaded_view").find("img").remove();
		btnOuter.removeClass("file_uploading");
		btnOuter.removeClass("file_uploaded");
 	});

	 document.getElementById("b2").addEventListener("click",()=>{
	
	const image = document.getElementById('wer');
		console.log('Logo has been loaded!');
		const canvas = faceapi.createCanvasFromMedia(image)
		$("#uploaded_view").append(canvas);
	//	document.body.append(canvas)
		const displaySize = { width: image.width, height: image.height }
		faceapi.matchDimensions(canvas, displaySize)
		setInterval(async () => {
			const detections =  await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
			const resizedDetections = faceapi.resizeResults(detections, displaySize)
			canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
			faceapi.draw.drawDetections(canvas, resizedDetections)
			faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
			faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
		  }, 100)
		  $('#b2').hide();
		

	 });



	 


	
	


	


      
     