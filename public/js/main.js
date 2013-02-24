angular
    .module('pschtt', [])
    .value('url', 'http://localhost:3000/ofs')
    .controller('main', function ($scope) {
        $scope.hello = 'Hello LyonJS';
    })
    .controller('crud', function ($scope, $http, url) {
        var modal = $('.modal');
        var initBtn = $('#initDatabase');
        var dropBtn = $('#dropDatabase');
        initBtn.hide();
        dropBtn.hide();

        $http.get(url+"DB/check").success(function(data){
            console.log(data.state);
            if(!data.state){
                initBtn.show();

            }else{
                dropBtn.show();
            }
        }) ;

        $scope.initDataBase = function(){
            $http.get(url+"DB/init").success(function(data){
                console.log(data.state);
                if(!data.state){
                    initBtn.hide();
                    dropBtn.show();
                    $http.get(url).success(function (data1) {
                        $scope.ofs = data1;
                    });
                }
            }) ;

        }

        $scope.dropDataBase = function(){
            $http.get(url+"DB/drop").success(function(data){
                console.log(data.state);
                if(!data.state){
                    initBtn.show();
                    dropBtn.hide();
                    $http.get(url).success(function (data1) {
                        $scope.ofs = data1;
                    });
                }
            }) ;

        }

        $http.get(url).success(function (data) {
            $scope.ofs = data;
        });

        $scope.edit = function (of) {
            $scope.of = of;
            modal.modal('show');
        };

        $scope.save = function () {
            if ($scope.of._id) {
                $http.put(url + '/' + $scope.of._id, $scope.of);
            } else {
                $http.post(url, $scope.of);
                $scope.ofs.push($scope.of);
            }
            modal.modal('hide');
        };

        $scope.delete = function (of) {
            $http.delete(url + '/' + of._id);
            $scope.ofs.splice($scope.ofs.indexOf(of), 1);
        };

        $scope.orderByCodeAscending = function(of) {
            return of.code;
        };

    });