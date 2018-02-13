angular.module('starter.controllers', [])

.controller('DemoCtrl', function ($scope, $ionicPopup) {
    $scope.byWEIXINlogin = function(){  
      // 授权读取用户信息  
      var scope = "snsapi_userinfo",  
        state = "_" + ( + new Date());  
      // 第一步：请求CODE  
      Wechat.auth(scope, state, function (response) {  
        // 第二步：通过code获取access_token   在这里就从微信返回了app，以下都是在app里进行的操作了  
          var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxa2b09ca566f98eb5&secret=b3ea0fe956e8edd2e1982ce4237e6c21&code="+response.code +"&grant_type=authorization_code";  
        $.get(url,function(result){  
          var resultjson = $.parseJSON(result);  
          var access_token = resultjson.access_token;  
          var openid = resultjson.openid;  
          // 第三步：通过access_token调用接口  
          var url1 = "https://api.weixin.qq.com/sns/auth?access_token=" + access_token +"&openid="+ openid;  
          $.get(url1,function(result){  
            var statusResult = $.parseJSON(result);  
            // 第四步：检验授权凭证（access_token）是否有效  
            if("ok" == statusResult.errmsg){  
              var url2 = "https://api.weixin.qq.com/sns/userinfo?access_token=" +access_token +"&openid="+ openid;  
              // 获取用户个人信息（UnionID机制）  
              $.get(url2,function(result){  
                var userinfo = $.parseJSON(result);  
                /*userinfo.openid;  
                 userinfo.nickname;  
                 userinfo.sex;  
                 userinfo.language;  
                 userinfo.city;  
                 userinfo.province;  
                 userinfo.country;  
                 userinfo.headimgurl;  
                 userinfo.privilege;  
                 userinfo.unionid;*/  
              })  
            }else{  
              // 请重新获取access_token  
            };  
      
          });  
        })  
      }, function (reason) {  
        alert("Failed: " + reason);  
      });  
    };  
    $scope.data = {
        selectedScene: 0,
        selectedSceneLabel: "会话"
    };

    $scope.scenes = [
        {
            label: "会话",
            value: 0
        },
        {
            label: "朋友圈",
            value: 1
        },
        {
            label: "收藏",
            value: 2
        }
    ];

    $scope.buttons = [
        {
            id: "check-installed",
            label: "是否安装了微信"
        },
        {
            id: "send-text",
            label: "发送Text消息给微信"
        },
        {
            id: "send-photo-local",
            label: "发送Photo消息给微信(本地图片)"
        },
        {
            id: "send-photo-remote",
            label: "发送Photo消息给微信(远程图片)"
        },
        {
            id: "send-link-thumb-local",
            label: "发送Link消息给微信(本地缩略图)"
        },
        {
            id: "send-link-thumb-remote",
            label: "发送Link消息给微信(远程缩略图)"
        },
        {
            id: "send-music",
            label: "发送Music消息给微信"
        },
        {
            id: "send-video",
            label: "发送Video消息给微信"
        },
        {
            id: "send-app",
            label: "发送App消息给微信"
        },
        {
            id: "send-nongif",
            label: "发送非gif消息给微信"
        },
        {
            id: "send-gif",
            label: "发送gif消息给微信"
        },
        {
            id: "send-file",
            label: "发送文件消息给微信"
        },
        {
            id: "auth",
            label: "微信授权登录"
        },
        {
            id: "test-url",
            label: "测试URL长度"
        },
        {
            id: "open-profile",
            label: "打开Profile"
        },

        {
            id: "open-mp",
            label: "打开mp网页"
        },
        {
            id: "add-card",
            label: "添加单张卡券至卡包"
        },
        {
            id: "add-cards",
            label: "添加多张卡券至卡包"
        }
    ];

    $scope.$watch('data.selectedScene', function () {
        $scope.scenes.forEach(function (item) {
            if (item.value == $scope.data.selectedScene) {
                $scope.data.selectedSceneLabel = item.label;
            }
        });
    }, true);

    $scope.handle = function (id) {
        share($scope.data.selectedScene, id);
    };
})

.controller('AboutCtrl', function($scope) {});
