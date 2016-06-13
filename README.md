# an-kid

https://angularjs.org/


Branches
Beta 1.6.x
This is the currently active development branch (master on Github), which receives new features and may contain breaking changes.
Stable 1.5.x
This is the latest stable branch (v1.5.x on Github), with regular bug fixes.
Legacy 1.2.x
This branch contains a legacy version of AngularJS that supports IE8 (v1.2.x on Github). It is not actively developed and will only receive security fixes. It is not recommended for new applications

Builds
Minified
Minified and obfuscated version of the AngularJS base code. Use this in your deployed application (but only if you can't use Google's CDN)
Uncompressed
The main AngularJS source code, as is. Useful for debugging and development purpose, but should ideally not be used in your deployed application
Zipped
The zipped version of the Angular Build, which contains both the builds of AngularJS, as well as documentation and other extras


Why Google CDN?
While downloading and using the AngularJS source code is great for development, we recommend that you source the script from Google's CDN (Content Delivery Network) in your deployed, customer facing app whenever possible. You get the following advantages for doing so:
Better Caching : If you host AngularJS yourself, your users will have to download the source code atleast once. But if the browser sees that you are referring to Google CDN's version of AngularJS, and your user has visited another app which uses AngularJS, then he can avail the benefits of caching, and thus reduce one download, speeding up his overall experience!
Decreased Latency : Google's CDN distributes your static content across the globe, in various diverse, physical locations. It increases the odds that the user gets a version of AngularJS served from a location near him, thus reducing overall latency.
Increased Parallelism : Using Google's CDN reduces one request to your domain. Depending on the browser, the number of parallel requests it can make to a domain is restricted (as low as 2 in IE 7). So it can make a gigantic difference in loading times for users of those browsers.

What is Bower?
Bower is a package manager for client-side JavaScript components.

For more info please see: https://github.com/bower/bower

bower install angular#1.5.6

npm install angular@1.5.6

Hello World with AngularJS

index.html


<html>
  <head>
    <title>My Angular App!</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="app.js"></script>
  </head>
  <body ng-app="helloWorld" ng-controller="MainCtrl">
    <div>
      {{test}}
    </div>
  </body>
</html>

app.js

var app = angular.module('helloWorld', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello world!';
}]);


<!DOCTYPE html>

<html>
<head>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
</head>

<body>
    
    <div ng-app="HelloWorldApp" ng-controller="HelloWorldController">

        <h1> Hello {{who}} </h1>

    </div>

    <script>

        var HWApp = angular.module('HelloWorldApp', []);

        HWApp.controller(
                    'HelloWorldController',
            ['$scope', function ($greet) {
                $greet.who = 'World!';
            } ]
        );

    </script>

  </body>
</html>


02
Displaying Lists
One thing that's is going to be absolutely fundamental to our app is displaying lists. Fortunately, angular makes this really easy using the ng-repeat directive.

To begin, we're going to modify our controller to include a new $scope variable that defines a list of post titles. Add the following code inside the controller function in app.js:
$scope.posts = [
  'post 1',
  'post 2',
  'post 3',
  'post 4',
  'post 5'
];
{info} The $scope variable serves as the bridge between Angular controllers and Angular templates. If you want something to be accessible in the template such as a function or variable, bind it to $scope

Now that we have a list of data we want to repeat, let's use ng-repeat to do it. Add the following code to line 8 of index.html, replacing the div that was there before:
<div ng-repeat="post in posts">
  {{post}}
</div>
When you refresh the page you should see a list of posts!

Now what if we want to display additional information about our posts? ng-repeat lets us do that too!

Let's amend our posts object to include some additional information we might be interested in displaying like the number of upvotes:
$scope.posts = [
  {title: 'post 1', upvotes: 5},
  {title: 'post 2', upvotes: 2},
  {title: 'post 3', upvotes: 15},
  {title: 'post 4', upvotes: 9},
  {title: 'post 5', upvotes: 4}
];
Now we change our ng-repeat directive to display the new information:
<div ng-repeat="post in posts">
  {{post.title}} - upvotes: {{post.upvotes}}
</div>
Of course it is important to order posts by number of upvotes, and we can tap into an angular filter to make it happen.

Add a filter to our posts based on the number of upvotes in descending order:
<div ng-repeat="post in posts | orderBy: '-upvotes'">
  {{post.title}} - upvotes: {{post.upvotes}}
</div>
AngularJS comes with several built in filters but you can also write custom filters tailored to your specific needs.


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
}]);


<html>
  <head>
    <title>My Angular App!</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="app.js"></script>
  </head>
  <body ng-app="helloList" ng-controller="MainCtrl">
    <div>
      <div ng-repeat="post in posts">
        {{post}}
      </div>

       <div ng-repeat="item in items">
        {{item.title}} - upvotes: {{item.upvotes}}
      </div>

      <div ng-repeat="item in items | orderBy: '-upvotes'">
        {{item.title}} - upvotes: {{item.upvotes}}
      </div>
    </div>
  </body>
</html>

03 Getting User Input

Now that we've learned how to display lists of information with Angular, it'd really be great if we could have the user add posts. To do this, we first need to add a function to our $scope variable.

Create a $scope function that will add an object into the posts array:
$scope.addPost = function(){
  $scope.posts.push({title: 'A new post!', upvotes: 0});
};
When this function is invoked, it will append a new post to our $scope.posts variable. Now we're going to have to allow the user to actually execute this function.

Create a button that executes our addPost $scope function using the ng-click directive:
<button ng-click="addPost()">Post</button>
Great, we can now click a button and have a new post show up! Let's extend this by allowing the user to actually specify what they want the title to be. First, we need to build out the form in HTML and sprinkle it with some Angular Magic.

Create a form below the ng-repeat div that will allow us to enter custom posts:
<form ng-submit="addPost()">
  <input type="text" ng-model="title"></input>
  <button type="submit">Post</button>
</form>
Here we've created a form that encompasses our title text-box and 'Post' button. We are also now calling our addPost() function using the ng-submit directive, which has the added benefit of the user being able to press the 'enter' key to submit the form. Finally, we're using the ng-model directive to bind the contents of the text box to $scope. This will allow our controller to access the contents of the text box using $scope.title.

To accompany the changes to our template, we need to make some tweaks to addPost().

Have the addPost function retrieve the title entered into our form, which is bound to the $scope variable title, and set title to blank once it has been added to the posts array:
$scope.addPost = function(){
  $scope.posts.push({title: $scope.title, upvotes: 0});
  $scope.title = '';
};
When we add a post we are now getting the title from $scope.title, which we then clear after the post has been created. At this point, it makes sense to prevent the user from posting a blank title.

Prevent a user from submitting a post with a blank title by adding the following line to the beginning of addPost():
if(!$scope.title || $scope.title === '') { return; }


04 Enable Upvoting
Now that we can add some new posts, why don't we allow a user to upvote existing ones? To get started, lets revisit our ng-repeat directive.

Next to each post, we need to place a click-able element that will increment the corresponding post's upvote counter:
<div ng-repeat="post in posts | orderBy:'-upvotes'">
  <span ng-click="incrementUpvotes(post)">^</span>
  {{post.title}} - upvotes: {{post.upvotes}}
</div>
We've now added a ^ character inside a <span> tag that when clicked, calls the incrementUpvotes() function in our controller, but we don't have that function in our controller yet!

Define the incrementUpvotes() function in our controller:
$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};
Notice that for this function we are passing the current instance of post to the function. This is happening by reference so when we increment upvotes, it gets automatically reflected back to the HTML page.

05 Submitting Links

Submitting Links
Ultimately, Flapper News is about sharing links to content, so lets enable users to submit links along with their titles. We'll start by adding a second text box to our form that a user can use to submit a link. We'll also add some placeholder text to make it clear which form is which:

Add a link field to our form that is bound to the scope variable link:
<form ng-submit="addPost()">
  <input type="text" placeholder="Title" ng-model="title"></input>
  <br>
  <input type="text" placeholder="Link" ng-model="link"></input>
  <br>
  <button type="submit">Post</button>
</form>
Next we're going to want to modify our addPost() function to include the link (notice that we aren't going to force the user to submit a link if they don't want to):
$scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0
  });
  $scope.title = '';
  $scope.link = '';
};
Finally we need to modify the ng-repeat section to make the title a link to the content, but only if a link was specified.

We'll do this by using a new directive called ng-hide, which hides elements when an Angular expression evaluates to true.

Use to ng-hide to hide the linked version of the title if no link exists and correspondingly show the unlinked version:
<div ng-repeat="post in posts | orderBy:'-upvotes'">
  <span ng-click="incrementUpvotes(post)">^</span>
  <a ng-show="post.link" href="{{post.link}}">
    {{post.title}}
  </a>
  <span ng-hide="post.link">
    {{post.title}}
  </span>
  - upvotes: {{post.upvotes}}
</div>
It is worth noting that ng-show is merely the inverse of ng-hide. You can use either one for programmatically displaying or hiding elements.

06 Adding Some Style

At this point, we have the basics of an application - a user can add new posts which are automatically ordered based on the number of upvotes. Up until now, however, our interface has been lacking in the looks department. We can spruce it up a bit using some basic Bootstrap styling.

Change your index.html file to include Twitter Bootstrap along with a new layout:
<html>
<head>
  <title>Flapper News</title>
  <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">

  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js"></script>
  <script src="app.js"></script>
  <style> .glyphicon-thumbs-up { cursor:pointer } </style>
</head>
<body ng-app="flapperNews" ng-controller="MainCtrl">
  <div class="row">
    <div class="col-md-6 col-md-offset-3">

      <div class="page-header">
        <h1>Flapper News</h1>
      </div>

      <div ng-repeat="post in posts | orderBy:'-upvotes'">
        <span class="glyphicon glyphicon-thumbs-up"
          ng-click="incrementUpvotes(post)"></span>
        {{post.upvotes}}
        <span style="font-size:20px; margin-left:10px;">
          <a ng-show="post.link" href="{{post.link}}">
            {{post.title}}
          </a>
          <span ng-hide="post.link">
            {{post.title}}
          </span>
        </span>
      </div>

      <form ng-submit="addPost()"
        style="margin-top:30px;">
        <h3>Add a new post</h3>

        <div class="form-group">
          <input type="text"
            class="form-control"
            placeholder="Title"
            ng-model="title"></input>
        </div>
        <div class="form-group">
          <input type="text"
          class="form-control"
          placeholder="Link"
          ng-model="link"></input>
        </div>
        <button type="submit" class="btn btn-primary">Post</button>
      </form>

    </div>
  </div>
</body>
</html>
At the top we've included Bootstrap from a CDN. In the body tag, we've made use of Bootstrap's grid system to align our content in the middle of the screen. We've also stylized the posts list and "Add a new post" form to make things a little easier to read. There's a lot more that could be done on this front so feel free to mess around with more styling before (or after) you continue.

(optional) Add your own styles!
