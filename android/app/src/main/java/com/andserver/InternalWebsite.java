package com.andserver;

import com.yanzhenjie.andserver.annotation.Website;
import com.yanzhenjie.andserver.framework.website.AssetsWebsite;




import com.yanzhenjie.andserver.AndServer;
import com.yanzhenjie.andserver.Server;

//import java.net.InetAddress;
import java.util.concurrent.TimeUnit;

/**
 * Created by YanZhenjie on 2018/9/17.
 */
@Website
public class InternalWebsite extends AssetsWebsite {

    private Server mServer;

    public InternalWebsite() {
        super("/web");

        //InetAddress inetAddress = "";

        mServer = AndServer.serverBuilder()
                //.inetAddress(inetAddress)
                .port(8080)
                .timeout(10, TimeUnit.SECONDS)
                .listener(new Server.ServerListener() {
                    @Override
                    public void onStarted() {
                        // TODO The server started successfully.
                    }

                    @Override
                    public void onStopped() {
                        // TODO The server has stopped.
                    }

                    @Override
                    public void onException(Exception e) {
                        // TODO An exception occurred while the server was starting.
                    }
                })
                .build();
        mServer.startup();
    }
}