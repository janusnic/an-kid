var app = angular.module('helloList', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.posts = [
  'post 1',
  'post 2',
  'post 3',
  'post 4',
  'post 5'
];
$scope.items = [
  {title: 'post 1', upvotes: 5},
  {title: 'post 2', upvotes: 2},
  {title: 'post 3', upvotes: 15},
  {title: 'post 4', upvotes: 9},
  {title: 'post 5', upvotes: 4}
];
$scope.addPost = function(){
  $scope.items.push({title: 'A new post!', upvotes: 0});
};

$scope.addItem = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.items.push({title: $scope.title, upvotes: 0});
  $scope.title = '';
};
}]);