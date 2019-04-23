package com.tcp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import java.net.Socket;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.support.annotation.Nullable;



import android.util.Log;

public class TcpModule extends ReactContextBaseJavaModule {


    private Socket mClient;
    private OutputStream client;

    //定义上下文对象
    private ReactContext myContext;

    /**
     * 服务端的ip
     */
    private String mDstName ="192.168.4.1";
    /**
     * 服务端端口号
     */
    private int mDesPort = 5000;

    public TcpModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.myContext = reactContext;

    }


    @Override
    public String getName() {
        return "Tcp";
    }

    //自定义属性
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("demo","我是测试属性");
        return constants;
    }

    @ReactMethod
    public void emit(String string,Callback cb){

        TcpModule mthis = this;
        new Thread(new Runnable() {

            @Override
            public void run() {
                try {

                    if (mClient == null) {
                        mthis.connect();
                    }

                    //Convert to byte[]
                    byte[] bytes = string.getBytes();

                    // 把数据写入到OuputStream对象中
                    client.write(bytes, 0, bytes.length);

                    // 发送读取的数据到服务端
                    //client.flush();
                }catch (IOException e){
                    mClient = null;
                    Log.d("test",e.getMessage());
                    cb.invoke(e.getMessage());
                }
            }
        }).start();

    }


    @ReactMethod
    public void socketInit(Callback cb) {
        try {
            this.connect();
            cb.invoke("连接socket正常");
        }catch (IOException e){
            Log.d("test",e.getMessage());
            mClient = null;
           // cb.invoke("连接异常：");
            cb.invoke(e.getMessage());
        }

    }


    //发送消息给ui
    private void sendMsg(String string)
    {

        WritableMap wm = Arguments.createMap();
        wm.putString("value",string);
        this.sendEvent(myContext,"onWifi", wm);

    }
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    /**
     * 与服务端进行连接
     *
     * @throws IOException
     */
    private void connect() throws IOException {
        if (mClient == null) {
            mClient = new Socket(mDstName, mDesPort);

            // 获取Socket的OutputStream对象用于发送数据。
            client = mClient.getOutputStream();

            //监听服务器消息
            TcpModule mthis = this;
            //在该方法中开启线程
            new Thread(new Runnable() {

                @Override
                public void run() {

                    try {
                        this.onWifi();
                    }catch (IOException e){
                        Log.d("test",e.getMessage());
                        mthis.sendMsg("异常"+e.getMessage());
                    }
                }

                public void onWifi() throws IOException {
                    mthis.sendMsg("监听" );
                    InputStream wifi = mClient.getInputStream();
                    byte[] buf = new byte[1024];
                    int len = 0;
                    while ((len = wifi.read(buf)) != -1) {
                        mthis.sendMsg(new String(buf, 0, len));
                    }
                }
            }).start();
        }

    }

}