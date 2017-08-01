(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('fbImageUpload', fbUploadDirective);


    // https://gist.github.com/abehaskins/7330325

    /** @ngInject */
   function fbUploadDirective() {
		return {
			link: function(scope, element, attrs) {
				// Modified from https://developer.mozilla.org/en-US/docs/Web/API/FileReader
				var fileReader = new FileReader();
				var fileFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
				var wasUploading = false;


				//scope.image = {valid: false};

				//console.log(attrs);

				var imageName = attrs.name;

				scope[imageName] = {valid: false};
				scope[imageName].isUploading = false;
				scope[imageName].isComplete = false;


				//scope.$watch(imageName+'.isUploading', function () {
				//	var isUploading = scope[imageName].isUploading;
				//	if (isUploading && !wasUploading) {
				//		wasUploading = true;
				//		console.log('wasUploading = true');
				//	}else if (!isUploading && wasUploading) {
				//		wasUploading = false;
				//		element.parent().parent()[0].reset();
				//		console.log('wasUploading = false');
                //  
				//	}
				//});

				fileReader.onload = function (fileReaderEvent) {
					scope.$apply(function () {
						//scope.image.data = fileReaderEvent.target.result;
						scope[imageName].data = fileReaderEvent.target.result;
						console.log('filereader onload apply...');						
					});
				};

				fileReader.onloadstart = function (fileReaderEvent) {
					scope.$apply(function () {
						scope[imageName].isUploading = true;
						scope[imageName].isComplete = false;

						console.log('onloadstart...');						
					});
				};

				fileReader.onloadend = function (fileReaderEvent) {
					scope.$apply(function () {
						scope[imageName].isUploading = false;
						scope[imageName].isComplete = true;

						console.log('onloadend...');						
					});
				};				

				var load_image = function(imageInput) {
					if (imageInput.files.length === 0) { 
						return;
					}

					var file = imageInput.files[0];

					//scope.image.filename = file.name;
					scope[imageName].filename = file.name;

					if (!fileFilter.test(file.type)) { 
						scope.error = 'You must select a valid image!';
						scope[imageName].valid = false;
						scope.$apply();
						return; 
					}else{
						scope.error = '';
						scope[imageName].valid = true;
					}

					fileReader.readAsDataURL(file);
					//console.log('after readasdataurl...');
					scope.$apply();
				};

				element[0].onchange = function() {
					load_image(element[0]);
				};
			},
			restrict: 'A'
		};

   }


}());