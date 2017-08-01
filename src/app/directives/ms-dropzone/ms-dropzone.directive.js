(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('msDropZone', msDropZoneDirective);

    // https://codepen.io/whusterj/pen/ijFgA

    /** @ngInject */
    function msDropZoneDirective() {
      return {
        restrict: 'A',
        scope: {
          file: '=',
          fileName: '='
        },
        link: function(scope, element, attrs) {
          // as explained here: http://stackoverflow.com/questions/10867506/dragleave-of-parent-element-fires-when-dragging-over-children-elements  
          var checkSize,
              isTypeValid,
              processDragOverOrEnter,
              processDragLeave,
              validMimeTypes;
          
          processDragOverOrEnter = function (event) {
            console.log('enter');

            if (event != null) {
              event.preventDefault();
            }
            event.dataTransfer.effectAllowed = 'copy';
            element.addClass('drag-target-parent-container');  
            element.addClass('hovered');
            return false;
          };

          processDragLeave = function (event) {
            console.log('leave');
            if (event != null) {
              event.preventDefault();
            }
            element.removeClass('hovered');
            element.removeClass('drag-target-parent-container');  

            return false;
          };
          
          validMimeTypes = attrs.fileDropzone;
          
          checkSize = function(size) {
            var _ref;
            if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
              return true;
            } else {
              alert("File must be smaller than " + attrs.maxFileSize + " MB");
              return false;
            }
          };

          isTypeValid = function(type) {
            if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
              return true;
            } else {
              alert("Invalid file type.  File must be one of following types " + validMimeTypes);
              return false;
            }
          };
          
          element.bind('dragover', processDragOverOrEnter);
          element.bind('dragenter', processDragOverOrEnter);
          element.bind('dragleave', processDragLeave);

          return element.bind('drop', function(event) {
            var file, name, reader, size, type;
            if (event != null) {
              event.preventDefault();
            }
            element.removeClass('hovered');
            element.removeClass('drag-target-parent-container');  

            reader = new FileReader();
            reader.onload = function(evt) {
              if (checkSize(size) && isTypeValid(type)) {
                return scope.$apply(function() {
                  scope.file = evt.target.result;
                  if (angular.isString(scope.fileName)) {
                    return scope.fileName = name;
                  }
                });
              }
            };
            file = event.dataTransfer.files[0];
            name = file.name;
            type = file.type;
            size = file.size;
            reader.readAsDataURL(file);
            return false;
          });
        }
      };
    }


})();