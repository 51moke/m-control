//
//  Tcp.m
//  mControl
//
//  Created by yl on 2019/4/28.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "Tcp.h"
#import <React/RCTLog.h>

#import <sys/socket.h>
#import <netinet/in.h>
#import <arpa/inet.h>
#import <unistd.h>


/** 这个端口可以随便设置*/
#define TEST_IP_PROT 8000
/** 替换成你需要连接服务器绑定的IP地址，不能随便输*/
#define TEST_IP_ADDR "192.168.1.101"

@implementation Tcp

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(emit:(NSString *)value callback:(RCTResponseSenderBlock)callback)
{
  demo();
  RCTLogInfo(@"接收到请求 %@", value);
}

void demo()
{
  


}



@end
