$(function () {
    $("[rel=tooltip]").tooltip();
});

User = {}
User.username = "Joe";

function MboxCtrl($scope) {
    $scope.activeBox = 'Inbox';

    $scope.boxes = [
        {name: 'Inbox'},
        {name: 'Sent'},
        {name: 'Archive'},
        {name: 'Spam'},
        {name: 'Trash'}
    ];

    $scope.convs = {
        Inbox : [
            {subject: 'Hello', from: 'Scragg', to: 'Joe', msg_count: 2, id: 1},
            {subject: 'Bro!', from: 'Seminull', to: 'Joe', msg_count: 1, id: 2}
        ],
        Sent: [],
        Archive: [],
        Spam: [],
        Trash: []
    };

    $scope.msgs = {
        1: [{text: 'hello!'}, {text: 'whats up!'}]
    };

    $scope.activateBox = function(box){
        $scope.activeBox = box.name;
    };

    $scope.addConv = function(box) {
        var id = random(100);
        $scope.convs[box].push({
            to: $scope.to,
            from: User.username,
            subject: $scope.subject,
            id: id,
            msg_count: 1
        });
        $scope.addMsg(id, $scope.text);
        $scope.subject = $scope.text = $scope.to = "";
    };

    $scope.addMsg = function(conv_id, text){
        $scope.msgs[conv_id] = {text: text};
    };

    $scope.moveConv = function(from_box, to_box_name){
        var old = $scope.convs[from_box.name];
        $scope.convs[from_box.name] = [];
        angular.forEach(old, function(conv){
            if (!conv.selected){
                $scope.convs[from_box.name].push(conv);
            } else {
                conv.selected = false;
                $scope.convs[to_box_name].push(conv);
            }
        });
    };

    $scope.formatConvName = function(conv, box){
        var r = "";
        if (box.name === 'Sent'){
            r += "To: " + conv.to;
        } else {
            r += conv.from
        }
        if (conv.msg_count > 1){
            r +=  " (" + conv.msg_count + ")";
        }
        return r
    };
}

function random(x, y){
    if (!y){
        y = x;
        x = 0;
    }
    return Math.floor((Math.random()*(y-x))+y)
}