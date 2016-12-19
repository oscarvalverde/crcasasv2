(function ()
{
    'use strict';

    angular
        .module('app.gallery')
        .controller('GalleryController', GalleryController);

    /** @ngInject */
    function GalleryController($scope, msUtils, myUtils, $mdSidenav, Documents)
    {

        var vm = this;

        // Data
        vm.accounts = {
            'creapond'    : 'johndoe@creapond.com',
            'withinpixels': 'johndoe@withinpixels.com'
        };
        vm.selectedAccount = 'creapond';
        vm.currentView = 'list';
        vm.showDetails = true;


        vm.filterIds = null;
        vm.listType = 'all';
        vm.listOrder = 'name';
        vm.listOrderAsc = false;


        vm.path = Documents.data.path;
        vm.folders = Documents.data.folders;
        vm.files = Documents.data.files;
        vm.selected = vm.files[0];

        vm.exists = msUtils.exists;

        vm.ngFlowOptions = {
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/

        };
        vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };

        // Methods
        vm.fileAdded = fileAdded;
        vm.upload = upload;
        vm.fileSuccess = fileSuccess;
        vm.imageSuccess = imageSuccess;

        vm.select = select;
        vm.toggleDetails = toggleDetails;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleView = toggleView;


        vm.removeItem = removeItem;
        vm.editImage = editImage;


        vm.sortableTableOptions = {
            appendTo            : 'body',
            connectWith         : '.files',            
            delay               : 75,
            distance            : 7,
            forceHelperSize     : true,
            forcePlaceholderSize: true,
            containment         : ".images-list",
            handle              : msUtils.isMobile() ? '.handle' : '.handle',


              helper: function(event, el)
              {
                return el.clone();
              },



 


            placeholder         : 'sortable-placeholder',
            tolerance           : 'pointer',
            scroll              : true,
            sort                : function (event, ui)
            {


            }
        };


        vm.sortableListOptions = {
            appendTo            : 'body',
            connectWith         : '.files',
            delay               : 75,
            distance            : 7,
            forceHelperSize     : true,
            forcePlaceholderSize: true,
            handle              : msUtils.isMobile() ? '.list-card-sort-handle' : false,
            helper              : function (event, el)
            {
                return el.clone();
            },            
            placeholder         : 'list-card card-sortable-placeholder',
            tolerance           : 'pointer',
            scroll              : true,
            sort                : function (event, ui)
            {
                var listContentEl = ui.placeholder.closest('.grid-view');
                var boardContentEl = ui.placeholder.closest('#gallery');

                if ( listContentEl )
                {
                    var listContentElHeight = listContentEl[0].clientHeight,
                        listContentElScrollHeight = listContentEl[0].scrollHeight;

                    if ( listContentElHeight !== listContentElScrollHeight )
                    {
                        var itemTop = ui.position.top,
                            itemBottom = itemTop + ui.item.height(),
                            listTop = listContentEl.offset().top,
                            listBottom = listTop + listContentElHeight;

                        if ( itemTop < listTop + 25 )
                        {
                            listContentEl.scrollTop(listContentEl.scrollTop() - 25);
                        }

                        if ( itemBottom > listBottom - 25 )
                        {
                            listContentEl.scrollTop(listContentEl.scrollTop() + 25);
                        }
                    }
                }

                if ( boardContentEl )
                {
                    var boardContentElWidth = boardContentEl[0].clientWidth;
                    var boardContentElScrollWidth = boardContentEl[0].scrollWidth;

                    if ( boardContentElWidth !== boardContentElScrollWidth )
                    {
                        var itemLeft = ui.position.left,
                            itemRight = itemLeft + ui.item.width(),
                            boardLeft = boardContentEl.offset().left,
                            boardRight = boardLeft + boardContentElWidth;

                        if ( itemLeft < boardLeft + 25 )
                        {
                            boardContentEl.scrollLeft(boardContentEl.scrollLeft() - 25);
                        }

                        if ( itemRight > boardRight )
                        {
                            boardContentEl.scrollLeft(boardContentEl.scrollLeft() + 25);
                        }
                    }
                }
            }
        };

        //////////

        /**
         * File added callback
         * Triggers when files added to the uploader
         *
         * @param file
         */
        function fileAdded(file)
        {

            if (!!{png:1,gif:1,jpg:1,jpeg:1}[file.getExtension()]) {
                // Prepare the temp file data for file list
                // png:1,gif:1,jpg:1,jpeg:1
                var uploadingFile = {
                    id       : file.uniqueIdentifier,
                    file     : file,
                    type     : '',
                    owner    : 'Emily Bennett',
                    size     : '',
                    modified : moment().format('MMMM D, YYYY'),
                    opened   : '',
                    created  : moment().format('MMMM D, YYYY'),
                    extention: '',
                    location : 'My Files > Documents',
                    offline  : false,
                    preview  : 'assets/images/etc/sample-file-preview.jpg'
                };
 
                // Append it to the file list
                vm.files.push(uploadingFile);
            } else return false;

        }

        /**
         * Upload
         * Automatically triggers when files added to the uploader
         */
        function upload()
        {
            // Set headers
            vm.ngFlow.flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            vm.ngFlow.flow.upload();
        }

        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)
        {
            // Iterate through the file list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.files, function (item, index)
            {
 
                if ( item.id && item.id === file.uniqueIdentifier )
                {


                    // Normally you would update the file from
                    // database but we are cheating here!

                    // Update the file info
                    item.name = file.name;
                    item.type = 'document';
                    item.image = true;
                    item.file = file.flowObj.files[0];
                    item.selected = false;
                    item.deleted = false;

                    console.log(file);

                    // Figure out & upddate the size
                    if ( file.file.size < 1024 )
                    {
                        item.size = parseFloat(file.file.size).toFixed(2) + ' B';
                    }
                    else if ( file.file.size >= 1024 && file.file.size < 1048576 )
                    {
                        item.size = parseFloat(file.file.size / 1024).toFixed(2) + ' Kb';
                    }
                    else if ( file.file.size >= 1048576 && file.file.size < 1073741824 )
                    {
                        item.size = parseFloat(file.file.size / (1024 * 1024)).toFixed(2) + ' Mb';
                    }
                    else
                    {
                        item.size = parseFloat(file.file.size / (1024 * 1024 * 1024)).toFixed(2) + ' Gb';
                    }
                }
            });
        }

        /**
         * Select an item
         *
         * @param item
         */
        function select(item)
        {
            vm.selected = item;
        }

        /**
         * Toggle details
         *
         * @param item
         */
        function toggleDetails(item)
        {
            vm.selected = item;
            toggleSidenav('details-sidenav');
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Toggle view
         */
        function toggleView()
        {
            vm.currentView = vm.currentView === 'list' ? 'grid' : 'list';
        }


        /**
         * Image Success
         * @param file
         * @param message
         */
        function imageSuccess(file, message)
        {
            var fileReader = new FileReader();

            fileReader.readAsDataURL(file.file);

            fileReader.onload = function (event)
            {
                file.url = event.target.result;

                $scope.$evalAsync(function ()
                {

                    // Iterate through the file list, find the one we
                    // are added as a temp and replace its data
                    // Normally you would parse the message and extract
                    // the uploaded file data from it
                    angular.forEach(vm.files, function (item, index)
                    {
         
                        if ( item.id && item.id === file.uniqueIdentifier )
                        {


                            // Normally you would update the file from
                            // database but we are cheating here!

                            // Update the file info
                            item.name = file.name;
                            item.type = 'image';
                            item.image = file.url;

                            item.title = "titulo";
                            item.subtitle = "subtitulo";
                            item.text = "texto";
                            item.media = {
                                    "image": {
                                        "src": file.url,
                                        "alt": "alterne"
                                    }
                                };

                            item.selected = false;
                            item.deleted = false;

                            // Figure out & upddate the size
                            if ( file.file.size < 1024 )
                            {
                                item.size = parseFloat(file.file.size).toFixed(0) + ' B';
                            }
                            else if ( file.file.size >= 1024 && file.file.size < 1048576 )
                            {
                                item.size = parseFloat(file.file.size / 1024).toFixed(0) + ' Kb';
                            }
                            else if ( file.file.size >= 1048576 && file.file.size < 1073741824 )
                            {
                                item.size = parseFloat(file.file.size / (1024 * 1024)).toFixed(0) + ' Mb';
                            }
                            else
                            {
                                item.size = parseFloat(file.file.size / (1024 * 1024 * 1024)).toFixed(0) + ' Gb';
                            }
                        }
                    });


                });
            };

        }


        /**
         * Edit image
         * Automatically triggers when files added to the uploader
         */
        function editImage()
        {

            vm.currentView = 'edit';

        }


        /**
         * Delete image
         * Automatically triggers when files added to the uploader
         */
        function removeItem(array, index)
        {

            array.splice(index, 1);
            alert(index);

        }


         vm.toggleSelected = toggleSelected;


        /**
         * Toggle selected status of the row
         *
         * @param row
         * @param event
         */
        function toggleSelected(file, event)
        {
            event.stopPropagation();
            file.selected = !file.selected;
        }


        /**
         * Selected
         *
         */

        vm.selectedImages = [];



        // Methods
        vm.deleteImageConfirm = deleteImageConfirm;
        vm.deleteImage = deleteImage;
        vm.deleteSelectedImage = deleteSelectedImages;
        vm.toggleSelectImage = toggleSelectImage;
        vm.deselectImages = deselectImages;
        vm.selectAllImages = selectAllImages;
        vm.deleteImage = deleteImage;


        /**
         * Change Images List Filter
         * @param type
         */
        function filterChange(type)
        {

            vm.listType = type;

            if ( type === 'all' )
            {
                vm.filterIds = null;
            }
             else if ( angular.isObject(type) )
            {
                vm.filterIds = type.contactIds;
            }

            vm.selectedImages = [];

        }

        /**
         * Delete Image Confirm Dialog
         */
        function deleteImageConfirm(image, ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the image?')
                .htmlContent('<b>' + 'contact.name' + ' ' + 'contact.lastName' + '</b>' + ' will be deleted.')
                .ariaLabel('delete contact')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                deleteImage(image);
                vm.selectedImages = [];

            }, function ()
            {

            });
        }

        /**
         * Delete Image
         */
        function deleteImage(image)
        {
            vm.images.splice(vm.images.indexOf(image), 1);
        }

        /**
         * Delete Selected Images
         */
        function deleteSelectedImages(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the selected images?')
                .htmlContent('<b>' + 'vm.selectedContacts.length' + ' selected</b>' + ' will be deleted.')
                .ariaLabel('delete images')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                vm.selectedImages.forEach(function (image)
                {
                    deleteImage(image);
                });

                vm.selectedImages = [];

            });

        }

        /**
         * Toggle selected status of the image
         *
         * @param image
         * @param event
         */
        function toggleSelectImage(image, event)
        {


            if ( event )
            {

                event.stopPropagation();
            }

            if ( vm.selectedImages.indexOf(image) > -1 )
            {
                vm.selectedImages.splice(vm.selectedImages.indexOf(image), 1);
            }
            else
            {
                vm.selectedImages.push(image);
            }
        }

        /**
         * Deselect images
         */
        function deselectImages()
        {
            vm.selectedImages = [];
        }

        /**
         * Sselect all images
         */
        function selectAllImages()
        {
            vm.selectedImages = $scope.filteredImages;
        }


    }
})();