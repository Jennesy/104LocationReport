# 104 旅步四營三連回報格式小工具

[104 旅步四營三連回報格式小工具](http://https://jennesy.github.io/104LocationReport/ '直接使用')

## Description

> 男友當兵每周放假都要**依照規定格式**定時回報相關資訊到連隊 LINE 群。每周末照三餐拷貝訊息、修改訊息真的好麻煩呀！而且有些隊員們常常項目東漏西漏回報不全... 為了讓男友可以在休假的時候有更多時間陪我，只好假公濟私，開發一個小工具給他了！

這是一個格式生成小工具，隊員們只要填寫資料送出，內容就會變成 104 旅步四營三連規定的回報格式嘍！

![](https://user-images.githubusercontent.com/68381960/179684753-47caf751-90c8-4bb5-b969-b78339079783.png)

## Features

- "早中晚回報"以及"收假回報" 兩種表單格式
- 提供常見內容選項 減省打字時間
- "其他"選項 可輸入客製內容
- "更新時間"按鈕 自動填寫現在時間
- "複製"按鈕 一鍵複製格式內容
- query string 讀取 name 和 number 屬性，連結存起來就不需要重打個人資料了(詳見進階功能說明)

## 進階功能說明

可以自行將名字和編號加入網址的 query string 當中 (分別為 name 和 number 屬性)。
以該連結進入，名字和編號就會自動填寫於表單中！
![query string demo](https://user-images.githubusercontent.com/68381960/179692418-0b8a1b8f-552e-4710-904b-2a4d4e9e6d4c.png 'query string demo')
