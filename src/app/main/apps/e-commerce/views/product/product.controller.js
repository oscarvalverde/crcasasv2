(function ()
{
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('ProductController', ProductController);

    /** @ngInject */
    function ProductController($document, $state, msUtils, Product, State, County, Listing, User)
    {
        var vm = this;

        // Data
        vm.taToolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];
        vm.product = Product.data;
        vm.state = State.data;
        vm.county = County.data;
        vm.listing = Listing.data;
        vm.user = User.data;

        vm.selectedIndex = 0;

        vm.selectedState = 2;
        vm.selectedCounty = 205;

        vm.categoriesSelectFilter = '';
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
        vm.dropping = false;

        // Methods
        vm.gotoProducts = gotoProducts;
        vm.onCategoriesSelectorOpen = onCategoriesSelectorOpen;
        vm.onCategoriesSelectorClose = onCategoriesSelectorClose;
        vm.fileAdded = fileAdded;
        vm.upload = upload;
        vm.fileSuccess = fileSuccess;

        //////////

        init();

        /**
         * Initialize
         */
        function init()
        {
            // Select the correct product from the data.
            // This is an unnecessary step for a real world app
            // because normally, you would request the product
            // with its id and you would get only one product.
            // For demo purposes, we are grabbing the entire
            // json file which have more than one product details
            // and then hand picking the requested product from
            // it.
            var id = $state.params.id;

            if ($state.current.name=='app.e-commerce.create')
            {

                        vm.list = vm.listing[0];
                        vm.list.name = vm.user.name;
                        vm.list.lastName = vm.user.lastName;
                        vm.list.email = vm.user.email;
                        vm.list.phone = vm.user.phone;
                        vm.list.company = vm.user.company;

                        vm.list.otherContact = vm.user.otherContact;
                        vm.list.otherName = vm.user.otherName;
                        vm.list.otherEmail = vm.user.otherEmail;
                        vm.list.otherPhone = vm.user.otherPhone;
                        vm.list.otherCompany = vm.user.otherCompany;


            } else {

                for ( var i = 0; i < vm.listing.length; i++ )
                {
                    

                    if ( parseInt(vm.listing[i].sourceKey) == parseInt(id) )
                    {
                        vm.list = vm.listing[i];
                        vm.product = vm.listing[i];
                        vm.list.name = vm.user.name;

                        break;
                    }
                }


            }

            // END - Select the correct product from the data
        }

        /**
         * Go to products page
         */
        function gotoProducts()
        {
            $state.go('app.e-commerce.products');
        }

        /**
         * On categories selector open
         */
        function onCategoriesSelectorOpen()
        {
            // The md-select directive eats keydown events for some quick select
            // logic. Since we have a search input here, we don't need that logic.
            $document.find('md-select-header input[type="search"]').on('keydown', function (e)
            {
                e.stopPropagation();
            });
        }

        /**
         * On categories selector close
         */
        function onCategoriesSelectorClose()
        {
            // Clear the filter
            vm.categoriesSelectFilter = '';

            // Unbind the input event
            $document.find('md-select-header input[type="search"]').unbind('keydown');
        }

        /**
         * File added callback
         * Triggers when files added to the uploader
         *
         * @param file
         */
        function fileAdded(file)
        {
            // Prepare the temp file data for media list
            var uploadingFile = {
                id  : file.uniqueIdentifier,
                file: file,
                type: 'uploading'
            };

            // Append it to the media list
            vm.product.images.push(uploadingFile);


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
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media item
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {

                       var c = document.getElementById("wmCanvas");
                       var ctx = c.getContext("2d");

                       var sourceImg = new Image();

                       sourceImg.src = event.target.result;

                       sourceImg.onload = function () {

                            c.width  = sourceImg.width;
                            c.height = sourceImg.height;

                            ctx.drawImage(sourceImg, 0, 0, c.width, c.height);

                            ctx.globalAlpha = 0.5;

                           var wmImg = document.getElementById("wmImg");

                           var wmSize = Math.max(c.width , c.height) * 0.10;

                            ctx.drawImage(wmImg,  (c.width/2 )- (wmSize/2), (c.height/2)-(wmSize/2), wmSize,wmSize);

                            var dataURL = c.toDataURL();

                            media.url = dataURL;

                        }

                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';


                }
            });
        }


        vm.sortableCardOptions = {
            appendTo            : 'body',
            connectWith         : '.list-images',
            delay               : 75,
            distance            : 7,
            forceHelperSize     : false,
            forcePlaceholderSize: true,
            handle              : msUtils.isMobile() ? '.list-image-sort-handle' : false,
            helper              : "original",                                   
            placeholder         : 'list-image image-sortable-placeholder',
            tolerance           : 'pointer',
            scroll              : true,
            sort                : function (event, ui)
            {

            }
        };



    }
})();