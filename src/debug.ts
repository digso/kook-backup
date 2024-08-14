import {add} from "./lib"
import axios from "axios"
import WebSocket from "ws"
import 'dotenv/config'

var data = {
    "s": 2,
    "sn": 0
}
function test_canRun() {
    const a = 1
    const b = 2
    console.log(`${a} + ${b} = ${add(a, b)}`)
}

function test_getWay(wsCallback: (data: any) => void) {
    
    const authorization = process.env.KOOK_TOKEN_TYPE + " " + process.env.KOOK_TOKEN
    const baseURL = process.env.KOOK_BASE_URL+ "" + process.env.KOOK_VERSION
    // console.log("test_getWay");
    // console.log(authorization)
    // console.log(baseURL)
    const instance = axios.create({
        baseURL: baseURL ,
        timeout: 1000,
        headers: {
            'Authorization': authorization,
            'Accept-Language': 'zh-CN',
        }
    });
    
    instance.get('/gateway/index').then(function (response) {
        //告知服务器不进行压缩操作
        var url = response.data.data.url.replace("compress=1", "compress=0")
        wsCallback(url)
    });
}

function test_env() {
    console.log(process.env.KOOK_BASE_URL)
}

function test_ws(url: string){
    // console.log("test_ws");
    const wss = new WebSocket(url)
    wss.onopen = function() {
        console.log('open')
        test_sendPing(wss)
    };
    wss.onclose = function(e){
        console.log("服务器关闭");
    }
    wss.onerror = function(){
        console.log("连接出错");
    }
    wss.onmessage = function(e){
        var re = test_barToJson(e)
        // data.sn = re.s
    }
}

function test_sendPing(wss : WebSocket){

    setInterval(()=>{
        console.log("发送ping")
        wss.send(JSON.stringify(data))
    },1000*30);
}

function test_barToJson(e: any){
    return JSON.parse(e.data.toString())
}

function test_KOOK(){
    // console.log("test_KOOK");
    test_getWay(test_ws)
}

test_KOOK()



