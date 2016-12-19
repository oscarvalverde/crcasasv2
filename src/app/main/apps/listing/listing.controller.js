(function ()
{
    'use strict';

    angular
        .module('app.listing')
        .controller('ListingController', ListingController);

    /** @ngInject */
    function ListingController($state, $scope, $mdSidenav, Listing, User, msUtils, $mdDialog, $document, DTOptionsBuilder)
    {

        var vm = this;

        vm.currentView = 'list';

        // Data
        vm.listing = Listing.data;
        vm.user = User.data;
        vm.filterIds = null;
        vm.rowType = 'all';
        vm.rowOrder = 'name';
        vm.rowOrderAsc = false;
        vm.selectedRows = [];
        vm.newGroupName = '';

        // Methods
        vm.filterChange = filterChange;
        vm.openRowDialog = openRowDialog;
        vm.deleteRowConfirm = deleteRowConfirm;
        vm.deleteRow = deleteRow;
        vm.deleteSelectedRows = deleteSelectedRows;
        vm.toggleSelectRow = toggleSelectRow;
        vm.deselectRows = deselectRows;
        vm.selectAllRows = selectAllRows;
        vm.deleteRow = deleteRow;
        vm.addNewGroup = addNewGroup;
        vm.deleteGroup = deleteGroup;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;
        vm.toggleView = toggleView;
        vm.toggleState = toggleState;

        // Data table

    //vm.dtOptions = DTOptionsBuilder.newOptions()
    //    .withPaginationType('simple')
    //    .withDisplayLength(5)
    //    .withDOM('<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>');


        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType  : 'simple',
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };



        //////////

        /**
         * Change Rows row Filter
         * @param type
         */
        function filterChange(type)
        {

            vm.rowType = type;

            if ( type === 'all' )
            {
                vm.filterIds = null;
            }
            else if ( type === 'frequent' )
            {
                vm.filterIds = vm.user.frequentRows;
            }
            else if ( type === 'starred' )
            {
                vm.filterIds = vm.user.starred;
            }
            else if ( angular.isObject(type) )
            {
                vm.filterIds = type.rowIds;
            }

            vm.selectedRows = [];

        }

        /**
         * Open new list dialog
         *
         * @param ev
         * @param list
         */
        function openRowDialog(ev, row)
        {
            $mdDialog.show({
                controller         : 'ListDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/listing/dialogs/listing/list-dialog.html',
                parent             : angular.element($document.find('#content-container')),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    List : row,
                    User    : vm.user,
                    Listing: vm.listing
                }
            });
        }

        /**
         * Delete List Confirm Dialog
         */
        function deleteRowConfirm(row, ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the row?')
                .htmlContent('<b>' + row.name + ' ' + row.lastName + '</b>' + ' will be deleted.')
                .ariaLabel('delete row')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                deleteRow(row);
                vm.selectedRows = [];

            }, function ()
            {

            });
        }

        /**
         * Delete Row
         */
        function deleteRow(row)
        {
            vm.listing.splice(vm.listing.indexOf(row), 1);
        }

        /**
         * Delete Selected Rows
         */
        function deleteSelectedRows(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the selected rows?')
                .htmlContent('<b>' + vm.selectedRows.length + ' selected</b>' + ' will be deleted.')
                .ariaLabel('delete rows')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                vm.selectedRows.forEach(function (row)
                {
                    deleteRow(row);
                });

                vm.selectedRows = [];

            });

        }

        /**
         * Toggle selected status of the row
         *
         * @param row
         * @param event
         */
        function toggleSelectRow(row, event)
        {
            if ( event )
            {
                event.stopPropagation();
            }

            if ( vm.selectedRows.indexOf(row) > -1 )
            {
                vm.selectedRows.splice(vm.selectedRows.indexOf(row), 1);
            }
            else
            {
                vm.selectedRows.push(row);
            }
        }

        /**
         * Deselect rows
         */
        function deselectRows()
        {
            vm.selectedRows = [];
        }

        /**
         * Sselect all rows
         */
        function selectAllRows()
        {
            vm.selectedRows = $scope.filteredRows;
        }

        /**
         *
         */
        function addNewGroup()
        {
            if ( vm.newGroupName === '' )
            {
                return;
            }

            var newGroup = {
                'id'        : msUtils.guidGenerator(),
                'name'      : vm.newGroupName,
                'listIds': []
            };

            vm.user.groups.push(newGroup);
            vm.newGroupName = '';
        }

        /**
         * Delete Group
         */
        function deleteGroup(ev)
        {
            var group = vm.rowType;

            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the group?')
                .htmlContent('<b>' + group.name + '</b>' + ' will be deleted.')
                .ariaLabel('delete group')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                vm.user.groups.splice(vm.user.groups.indexOf(group), 1);

                filterChange('all');
            });

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
         * Toggle state
         */
        function toggleState(row)
        {
            row.status = row.status === 'active' ? 'pause' : 'active';
        }


        // Methods
        vm.gotoRowDetail = gotoRowDetail;

        //////////

        /**
         * Go to row detail
         *
         * @param id
         */
        function gotoRowDetail(id)
        {
            $state.go('app.e-commerce.products.detail', {id: id});
        }


    }

})();