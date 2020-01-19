Component({
    data: {
        selected: 0,
        show: true,
        color: "#101010",
        selectedColor: "#101010",
        list: [{
                pagePath: "/pages/tab/home/index",
                iconPath: "/static/images/tab@home.png",
                selectedIconPath: "/static/images/tab@home_active.png",
                text: "首页",
                linkType: false
            },
            {
                pagePath: "/pages/tab/mine/index",
                iconPath: "/static/images/tab@mine.png",
                selectedIconPath: "/static/images/tab@mine_active.png",
                text: "我的",
                linkType: false
            }
        ]
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            const type = data.type;
            const index = data.index
            !type ? wx.switchTab({
                url
            }) : wx.navigateTo({
                url
            });
            this.setData({
                selected: data.index
            })
        }
    }
})