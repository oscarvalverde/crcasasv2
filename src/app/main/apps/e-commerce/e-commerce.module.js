(function ()
{
    'use strict';

    angular
        .module('app.e-commerce',
            [
                'flow',
                'ngMask'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.e-commerce', {
                abstract: true,
                url     : '/e-commerce'
            })
            .state('app.e-commerce.dashboard', {
                url      : '/dashboard',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/dashboard/dashboard.html',
                        controller : 'DashboardEcommerceController as vm'
                    }
                },
                resolve  : {
                    Dashboard: function (msApi)
                    {
                        return msApi.resolve('e-commerce.dashboard@get');
                    }                    
                },
                bodyClass: 'ecommerce'
            })
            .state('app.e-commerce.products', {
                url      : '/products',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/products/products.html',
                        controller : 'ProductsController as vm'
                    }
                },
                resolve  : {
                    Products: function (msApi)
                    {
                        return msApi.resolve('e-commerce.products@get');
                    },
                    Listing: function (msApi)
                    {
                        return msApi.resolve('e-commerce.listing@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.create', {
                url      : '/create',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/product/product.html',
                        controller : 'ProductController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('e-commerce.product@get');
                    },
                    State: function (msApi)
                    {
                        return msApi.resolve('e-commerce.states@get');
                    },
                    County: function (msApi)
                    {
                        return msApi.resolve('e-commerce.counties@get');
                    },
                    Listing: function (msApi)
                    {
                        return msApi.resolve('e-commerce.listing@get');
                    },
                    User: function (msApi)
                    {
                        return msApi.resolve('e-commerce.user@get');
                    }                                                            

                },
                bodyClass: 'e-commerce'
            })            
            .state('app.e-commerce.products.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/product/product.html',
                        controller : 'ProductController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('e-commerce.product@get');
                    },
                    State: function (msApi)
                    {
                        return msApi.resolve('e-commerce.states@get');
                    },
                    County: function (msApi)
                    {
                        return msApi.resolve('e-commerce.counties@get');
                    },
                    Listing: function (msApi)
                    {
                        return msApi.resolve('e-commerce.listing@get');
                    }                                                            
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.orders', {
                url      : '/orders',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/orders/orders.html',
                        controller : 'OrdersController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('e-commerce.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.orders.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/order/order.html',
                        controller : 'OrderController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/e-commerce');

        // Api
        msApiProvider.register('e-commerce.dashboard', ['app/data/e-commerce/dashboard.json']);
        msApiProvider.register('e-commerce.products', ['app/data/e-commerce/products.json']);
        msApiProvider.register('e-commerce.product', ['app/data/e-commerce/product.json']);

        msApiProvider.register('e-commerce.states', ['app/data/listing/state.json']);
        msApiProvider.register('e-commerce.counties', ['app/data/listing/county.json']);


        msApiProvider.register('e-commerce.orders', ['app/data/e-commerce/orders.json']);
        msApiProvider.register('e-commerce.statuses', ['app/data/e-commerce/statuses.json']);
        msApiProvider.register('e-commerce.order', ['app/data/e-commerce/order.json']);

        msApiProvider.register('e-commerce.listing', ['app/data/listing/listing.json']);
        msApiProvider.register('e-commerce.user', ['app/data/listing/user.json']);


        // Navigation
        msNavigationServiceProvider.saveItem('apps.e-commerce', {
            title : 'Anuncios',
            icon  : 'icon-tag',
            weight: 4
        });


        msNavigationServiceProvider.saveItem('apps.e-commerce.create', {
            title: 'Publicar Anuncio',
            state: 'app.e-commerce.create',
            stateParams: {id: 0}        
        });  

        msNavigationServiceProvider.saveItem('apps.e-commerce.products', {
            title: 'Anuncios Activos',
            state: 'app.e-commerce.products',
            badge      : {
                content: 10,
                color  : '#09d261'
            },            
        });
      

        msNavigationServiceProvider.saveItem('apps.e-commerce.orders', {
            title: 'Anuncios Inactivos',
            state: 'app.e-commerce.orders',
            badge      : {
                content: 5,
                color  : '#F44336'
            }, 
        });
    }
})();