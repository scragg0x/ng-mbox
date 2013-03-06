User = {};
User.id = 1;
User.username = "Joe";

Mbox = {};
Mbox.users = {
    1: {username: 'Joe'},
    2: {username: 'Scragg'},
    3: {username: 'Seminull'}
};

angular.module('mbox', [], function($routeProvider, $locationProvider) {
    $routeProvider.when('/:folder_name/:conv_id', {
        templateUrl: 'conv.html',
        controller: ConvCtrl
    });
});

function MboxCtrl($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.active_folder = 1;

    $scope.box = {
        user_id: User.id,
        conv_count: 0,
        msg_count: 0,
        new_count: 0,
        spam_count: 0,
        time_read: 0
    };

    $scope.folders = [
        {id: 1, name: 'Inbox'},
        {id: 2, name: 'Sent'},
        {id: 3, name: 'Archive'},
        {id: 4, name: 'Spam'},
        {id: 5, name: 'Trash'}
    ];

    $scope.convs = {
        1 : [
            {subject: 'Hello', time_started: 0, time_updated: 0, msg_count: 2, id: 1, unread: 0, users:[1,2]},
            {subject: 'Bro!', time_started: 0, time_updated: 0, msg_count: 1, id: 2, unread: 1, users:[1,3]}
        ],
        2 : [
            {subject: 'hey!', time_started: 0, time_updated: 0, msg_count: 1, id: 3, unread: 0, users:[1,2]}
        ]
    };

    $scope.msgs = {
        1: [
            {id: 1, msg: 'hello!', time_sent: 0, user_id: 1},
            {id: 2, msg: 'whats up!', time_sent: 0, user_id: 2}
        ],
        3: [{id: 3, msg: 'what is your favorite color?', time_sent: 0, user_id: 2}]
    };

    $scope.activateFolder = function(folder){
        $scope.active_folder = folder.id;
    };

    $scope.getConvCount = function(folder){
        if ($scope.convs[folder.id]){
            return $scope.convs[folder.id].length;
        } else {
            return 0;
        }
    };

    $scope.addConv = function(folder) {
        var id = random(100);
        $scope.convs[folder.id].push({
            to: $scope.to,
            from: User.username,
            subject: $scope.subject,
            id: id,
            msg_count: 1
        });
        $scope.addMsg(id, $scope.text);
        $scope.subject = $scope.text = $scope.to = "";
    };

    $scope.addMsg = function(conv_id, msg){
        $scope.msgs[conv_id] = {msg: msg};
    };

    $scope.moveConv = function(from_folder, to_folder_id){
        var old = $scope.convs[from_folder.id];
        $scope.convs[from_folder.id] = [];
        angular.forEach(old, function(conv){
            if (!conv.selected){
                $scope.convs[from_folder.id].push(conv);
            } else {
                conv.selected = false;
                $scope.convs[to_folder_id].push(conv);
            }
        });
    };

    $scope.go = function (hash) {
        $location.hash(hash);
    };

    $scope.formatConvName = function(conv, folder){
        var r = "";
        if (folder.name === 'Sent'){
            r += "To: ";
        }

        angular.forEach(conv.users, function(id){
            if (id != User.id){
                r += Mbox.users[id].username + " ";
            }
        });

        if (conv.msg_count > 1){
            r +=  " (" + conv.msg_count + ")";
        }
        return r;
    };
}

function ConvCtrl($scope, $routeParams){
    $scope.params = $routeParams;
}

function random(x, y){
    if (!y){
        y = x;
        x = 0;
    }
    return Math.floor((Math.random()*(y-x))+y);
}