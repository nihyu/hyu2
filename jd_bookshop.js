/ *
口袋书店
活动入口：京东app首页-京东图书-右侧口袋书店
已支持IOS双京东账号，Node.js支持N个京东账号
脚本兼容：QuantumultX，Surge，Loon，JSBox，Node.js
============ Quantumultx ===============
[task_local]
＃口袋书店
1 8,12,18 * * * https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_bookshop.js，tag=口袋书店，enabled = true
===============月球===============
[脚本]
cron“ 1 8,12,18 * * *”脚本路径= https：//raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_bookshop.js,tag=口袋书店
==============浪涌=================
口袋书店= type = cron，cronexp =“ 1 8,12,18 * * *”，唤醒系统= 1，超时= 20，脚本路径= https：//raw.githubusercontent.com/LXK9301/jd_scripts/master /jd_bookshop.js
============小火箭=========
口袋书店=类型= cron，脚本路径= https：//raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_bookshop.js，cronexpr =“ 1 8,12,18 * * *”，超时= 200，启用=真
 * /
const  $  =  new  Env （'口袋书店' ）;
const  notify  =  $ 。isNode （）？要求（'./sendNotify' ）：'' ;
const  jdCookieNode  =  $ 。isNode （）？require （'./jdCookie.js' ）：'' ;
//Node.js用户请在jdCookie.js处填写京东ck;
// IOS等用户直接用NobyDa的jd cookie
让 cookiesArr  =  [ ] ， cookie  =  '' ， 消息;
const  ACT_ID  =  'dz2010100034444201' ， shareUuid  =  '28a699ac78d74aa3b31f7103597f8927'
让 ADD_CART  =  false
ADD_CART  =  $ 。isNode （）？（过程。ENV 。PURCHASE_SHOPS？过程。ENV 。PURCHASE_SHOPS：ADD_CART ）：（$ 。的GetData （“ADD_CART” ）？ $ 。的GetData （“ADD_CART” ）： ADD_CART ）;
//加入购物车开关，与东东小窝共享

让 vitateCodes  =  [
  '28a699ac78d74aa3b31f7103597f8927 @ 2f14ee9c92954cf79829320dd482bf49 @ fdf827db272543d88dbb51a505c2e869 @ ce2536153a8742fb9e8754a9a7d361da @ 38ba4e7ba8074b78851e928af2b4f6b2' ，
  '28a699ac78d74aa3b31f7103597f8927 @ 2f14ee9c92954cf79829320dd482bf49 @ fdf827db272543d88dbb51a505c2e869'
]

如果 （$ 。isNode （）） {
  对象。键（jdCookieNode ）。forEach （（项目） =>  {
    cookiesArr 。推送（jdCookieNode [ item ] ）
  } ）
  如果 （过程。ENV 。JD_DEBUG  && 过程。ENV 。JD_DEBUG  ===  '假' ） 的控制台。log  =  （） =>  {
  } ;
} 其他 {
  让 cookiesData  =  $ 。getdata （'CookiesJD' ） ||  “ []” ;
  cookiesData  =  jsonParse （cookiesData ）;
  cookiesArr  =  cookiesData 。映射（项 => 项。饼干）;
  cookiesArr 。反向（）;
  cookiesArr 。推（ ... [ $ 。的GetData （'CookieJD2' ）， $ 。的GetData （'CookieJD' ）] ）; 
  cookiesArr 。反向（）;
  cookiesArr  =  cookiesArr 。过滤器（item  =>  item！== “”  &&  item！== null  &&  item！== undefined ）;
}

！（异步 （） =>  {
  如果 （！cookiesArr [ 0 ] ） {
    $ 。msg （$ 。name ， '【提示】请先获取京东账号一cookie \ n直接使用NobyDa的京东签到获取' ， 'https: //bean.m.jd.com/ ' ， { “ open-url”：“ https://bean.m.jd.com/” } ）；
    回报;
  }
  $ 。shareCodesArr  =  [ ]
  等待 requireConfig （）
  对于 （让 我 =  0 ; 我 <  cookiesArr 。长度; 我++ ） {
    如果 （cookiesArr [ i ] ） {
      cookie  =  cookiesArr [ i ] ；
      $ 。用户名 =  decodeURIComponent （饼干。匹配（/ pt_pin = （。+？） ; / ） && 饼干。匹配（/ pt_pin = （。+？） ; / ）[ 1 ] ）
      $ 。指数 =  i  +  1 ;
      $ 。isLogin  =  true ;
      $ 。nickName  =  '' ;
      消息 =  '' ;
      等待 TotalBean （）;
      控制台。日志（`\ n ******开始【京东账号$ { $ 。索引}】$ { $ 。昵称 ||  $ 。用户名} ********* \ N` ）;
      如果 （！$ 。isLogin ） {
        $ 。味精（$ 。名称， `【提示】饼干已失效` ， `京东账号$ { $ 。指数}  $ { $ 。绰号 ||  $ 。用户名} \ n请重新登录获取\ nhttps：//bean.m。 jd.com /` ， { “ open-url”：“ https://bean.m.jd.com/” } ）；
        如果 （$ 。isNode （）） {
          等待 通知。sendNotify （` $ { $ 。名}饼干已失效- $ { $ 。用户名} ` ， `京东账号$ { $ 。指数}  $ { $ 。用户名} \ n请重新登录获取cookie` ）;
        } 其他 {
          $ 。setdata （'' ， `CookieJD $ { i？i  +  1：“” } ` ）; $ .setdata（''，`CookieJD $ {i？i + 1：“”}`）; // cookie无效，故清空cookie。
        }
        继续
      }
      等待 shareCodesFormat （）
      等待 jdBeauty （）
    }
  }
} ）（）
  。抓（（e ） =>  {
    $ 。日志（'' ， `❌ $ { $ 。名字}，失败原因：$ { é } `！ ， '' ）
  } ）
  。最后（（） =>  {
    $ 。完成（）;
  } ）

异步 函数 jdBeauty （） {
  $ 。分数 =  0
  等待 getIsvToken （）
  等待 getIsvToken2 （）
  等待 getActCk （）
  等待 getActInfo （）
  等待 getToken （）
  等待 getUserInfo （）
  等待 getActContent （false ， shareUuid ）
  如果 （$ 。退出） 返回
  等待 doHelpList （）
  等待 getAllBook （）
  等待 getMyBook （）
  等待 getActContent （true ）
  如果 （$ 。金 >  800 ） {
    控制台。日志（`金币大于800，去抽奖` ）
    while  （$ 。gold > = 800 ） {
      等待 抽奖（）
      等待 $ 。等待（1000 ）
      $ 。金 -=  800
    }
  }
  如果（$ 。USERINFO 。storeGold ） 的await  chargeGold （）
  等待 帮助朋友（）
  等待 showMsg （）;
}

异步 功能 helpFriends （） {
  对于 （让 代码 的 $ 。newShareCodes ） {
    如果 （！代码） 继续
    控制台。日志（`去助力好友$ {代码} ` ）
    等待 getActContent （true ， code ）
    等待 $ 。等待（500 ）
  }
}

//获得IsvToken
函数 getIsvToken （） {
  返回 新的 Promise （resolve  =>  {
    let  body  =  'body =％7B％22to％22％3A％22https％3A％5C％2F％5C％2Flzdz-isv.isvjcloud.com％5C％2Fdingzhi％5C％2Fbook％5C％2Fdevelop％5C％2FFingzhi％3FactivityId ％3Ddz2010100034444201％22％2C％22action％22％3A％22to％22％7D＆build = 167490＆client = apple＆clientVersion = 9.3.2＆openudid = 53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2＆sign = f3eb9660e798＆20 = 1023b9660e798＆20102734
    $ 。post （jdUrl （'genToken' ， body ）， async  （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            $ 。isvToken  =  data [ 'tokenKey' ]
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//获得对应游戏的访问令牌
函数 getIsvToken2 （） {
  返回 新的 Promise （resolve  =>  {
    let  body  =  'body =％7B％22url％22％3A％22https％3A％5C％2F％5C％2Flzdz-isv.isvjcloud.com％22％2C％22id％22％3A％22％22％22％7D＆build = 167490＆client = apple＆clientVersion = 9.3.2＆openudid = 53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2＆sign = 6050f8b81f4ba562b357e49762a8f4b0＆st = 1610267024346＆sv = 121'
    $ 。post （jdUrl （'isvObfuscator' ， body ）， async  （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            $ 。token2  = 数据[ '令牌' ]
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//获得游戏的Cookie
函数 getActCk （） {
  返回 新的 Promise （resolve  =>  {
    $ 。get （taskUrl （“ dingzhi / book / develop / activity” ， `activityId = $ { ACT_ID } ` ）， （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果（$ 。isNode （））
            对于 （让 CK 的 RESP [ '报头' ] [ '的Set-Cookie' ] ） {
              cookie  =  ` $ { cookie } ; $ { ck 。split （“;” ）[ 0 ] } ;`
            }
          其他{
            for  （让 ck 的 resp [ 'headers' ] [ 'Set-Cookie' ] 。split （'，' ）） {
              cookie  =  ` $ { cookie } ; $ { ck 。split （“;” ）[ 0 ] } ;`
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//获得游戏信息
函数 getActInfo （） {
  返回 新的 Promise （resolve  =>  {
    $ 。post （taskPostUrl （'dz / common / getSimpleActInfoVo' ， `activityId = $ { ACT_ID } ` ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            如果 （数据。结果） {
              $ 。shopId  =  data 。数据。shopId
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//获得游戏的令牌
函数 getToken （） {
  返回 新的 Promise （resolve  =>  {
    let  body  =  `userId = $ { $ 。shopId }＆token = $ { $ 。token2 }＆fromType = APP`
    $ 。post （taskPostUrl （'customer / getMyPing' ， body ）， async  （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            $ 。令牌 = 数据。数据。秘密密码
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//获得用户信息
函数 getUserInfo （） {
  返回 新的 Promise （resolve  =>  {
    let  body  =  `pin = $ { encodeURIComponent （$ 。token ）} `
    $ 。发布（taskPostUrl （'wxActionCommon / getUserInfo' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            如果 （数据。数据） {
              控制台。日志（`用户【$ {数据。数据。昵称}】信息获取成功` ）
              $ 。userId  = 数据。数据。ID
              $ 。pinImg  = 数据。数据。yunMidImageUrl
              $ 。nick  = 数据。数据。昵称
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//获得游戏信息
函数 getActContent （ info =  false ， shareUuid =  '' ） {
  返回 新的 Promise （resolve  =>  {
    let  body  =  `activityId = $ { ACT_ID }＆pin = $ { encodeURIComponent （$ 。token ）}＆pinImg = $ { $ 。pinImg }＆nick = $ { $ 。尼克}＆cjyxPin =＆cjhyPin =＆shareUuid = $ { shareUuid } `
    $ 。发布（taskPostUrl （'dingzhi / book / develop / activityContent' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            如果 （数据。数据） {
              $ 。userInfo  = 数据。数据
              如果 （！$ 。USERINFO 。书店） {
                $ 。退出 = 真
                控制台。日志（`京东账号$ { $ 。指数}尚未开启口袋书店，请手动开启` ）
                返回
              }
              $ 。actorUuid  =  $ 。userInfo 。演员
              if （！info ） 控制台。日志（`您的好友助力码为$ { $ 。actorUuid } ` ）
              $ 。黄金 =  $ 。userInfo 。bookStore 。hasStoreGold
              如果 （！info ） {
                const 任务 = 数据。数据。settingVo
                对于 （让 任务 的 任务） {
                  如果 （[ '关注店铺' ] 。包括（任务。标题）） {
                    如果 （任务。okNum  < 任务。dayMaxNum ） {
                      控制台。日志（`去做$ {任务。标题}任务` ）
                      await  doTask （任务。设置[ 0 ] 。类型， 任务。设置[ 0 ] 。值）
                    }
                  } 否则， 如果 （[ '逛会场' ， '浏览店铺' ， '浏览商品' ] 。包括（任务。标题）） {
                    如果 （任务。okNum  < 任务。dayMaxNum ） {
                      控制台。日志（`去做$ {任务。标题}任务` ）
                      对于 （让 组 的 任务。设置。过滤器（VO  =>  VO 。状态 ===  0 ）） {
                        AWAIT  doTask （集。类型， 集。值）
                        等待 $ 。等待（500 ）
                      }
                    }
                  } 否则 如果（任务。标题 ===  '每日签到' ）{
                    const  hour  =  new  Date （）。getUTCHours （） +  8
                    如果 （8 <=小时 && 小时 <  10  ||  12 <=小时 && 小时 <  14  ||  18 <=小时 && 小时 <  20 ） {
                      控制台。日志（`去做$ {任务。标题}任务` ）
                      对于 （让 组 的 任务。设置。过滤器（VO  =>  VO 。状态 ===  0 ）） {
                        让 RES  =  AWAIT  doTask （集。类型， 集。值）
                        如果 （RES 。结果） 突破
                        等待 $ 。等待（500 ）
                      }
                    }
                  } 否则， 如果 （ADD_CART  &&  [ '加购商品' ] 。包括（任务。标题）） {
                    如果 （任务。okNum  < 任务。dayMaxNum ） {
                      控制台。日志（`去做$ {任务。标题}任务` ）
                      await  doTask （任务。设置[ 0 ] 。类型， 任务。设置[ 0 ] 。值）
                    }
                  }
                }
              }
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}
函数 doHelpList （taskType ， value ） {
  let  body  =  `activityId = $ { ACT_ID }＆actorUuid = $ { $ 。actorUuid }＆num = 0＆sortStatus = 1`
  返回 新的 Promise （resolve  =>  {
    $ 。发布（taskPostUrl （'dingzhi / taskact / common / getDayShareRecord' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            控制台。日志（`今日助力情况$ {数据。数据。长度} / 10` ）
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）

}
//做任务
功能 doTask （任务类型， 值） {
  let  body  =  `activityId = $ { ACT_ID }＆pin = $ { encodeURIComponent （$ 。token ）}＆actorUuid = $ { $ 。actorUuid }＆taskType = $ { taskType }＆taskValue = $ { value } `
  返回 新的 Promise （resolve  =>  {
    $ 。发布（taskPostUrl （'dingzhi / book / develop / saveTask' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            if  （数据。结果 && 数据。数据） {
              控制台。日志（`任务完成成功，获得$ {数据。数据。addScore }积分` ）
              $ 。得分 + = 数据。数据。addScore
            } 其他 {
              控制台。日志（`任务完成失败，错误信息：$ {数据。的errorMessage } ` ）
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）

}

//抽奖
函数 draw （） {
  let  body  =  `activityId = $ { ACT_ID }＆pin = $ { encodeURIComponent （$ 。token ）}＆actorUuid = $ { $ 。actorUuid } `
  返回 新的 Promise （resolve  =>  {
    $ 。发布（taskPostUrl （'dingzhi / book / develop / startDraw' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            if  （数据。结果 && 数据。数据） {
              if  （数据。数据。名称） {
                控制台。日志（`抽奖成功，获得奖品：$ {数据。数据。名称} ` ）
                message  + =  `抽奖成功，获得奖品：$ { data 。数据。名称} \ n`
              } 其他 {
                控制台。日志（`抽奖成功，获得空气` ）
                讯息 + =  `抽奖成功，获得空气`
              }
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//获得图书
函数 getAllBook （） {
  let  body  =  `activityId = $ { ACT_ID }＆actorUuid = $ { $ 。actorUuid }＆pin = $ { encodeURIComponent （$ 。token ）} `
  返回 新的 Promise （resolve  =>  {
    $ 。发布（taskPostUrl （'dingzhi / book / develop / getAllBook' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            if  （数据。结果 && 数据。数据） {

              const  book  =  data 。数据。bookConfigList [ 0 ]
              让 num  =  Math 。TRUNC （数据。数据。haveScore /书。buyBookScore ）
              控制台。日志（`拥有$ {数据。数据。haveScore }积分，可购买$ { NUM }本` ）
              如果 （num  >  0 ） {
                的await  buyBook （书。UUID ， NUM ）
              }
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

//购买图书
函数 buyBook （bookUuid ， num ） {
  let  body  =  `activityId = $ { ACT_ID }＆actorUuid = $ { $ 。actorUuid }＆pin = $ { encodeURIComponent （$ 。token ）}＆bookUuid = $ { bookUuid }＆buyNum = $ { num } `
  返回 新的 Promise （resolve  =>  {
    $ 。post （taskPostUrl （'dingzhi / book / develop / buyBook' ， body ）， async  （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            if  （数据。结果 && 数据。数据） {
              控制台。日志（`购买【$ {数据。数据。BookIncome 。BOOKNAME }】成功` ）
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

函数 getMyBook （） {
  let  body  =  `activityId = $ { ACT_ID }＆actorUuid = $ { $ 。actorUuid }＆pin = $ { encodeURIComponent （$ 。token ）}＆type1 = 1＆type2 = 1＆type3 = 1＆type = 1`
  返回 新的 Promise （resolve  =>  {
    $ 。post （taskPostUrl （'dingzhi / book / develop / getMyBook' ， body ）， async  （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            if  （数据。结果 && 数据。数据） {
              对于 （让 书 的 数据。数据。myBookList ） {
                如果 （书。isPutOn！== 1  && 书。库存 >  0 ） {
                  控制台。日志（`去上架【$ {书。BOOKNAME }】` ）
                  的await  upBook （书。bookUuid ）
                }
              }
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

函数 upBook （bookUuid ） {
  let  body  =  `activityId = $ { ACT_ID }＆actorUuid = $ { $ 。actorUuid }＆pin = $ { encodeURIComponent （$ 。token ）}＆bookUuid = $ { bookUuid }＆isPutOn = 1＆position = 1`
  返回 新的 Promise （resolve  =>  {
    $ 。发布（taskPostUrl （'dingzhi / book / develop / upBook' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            if  （数据。结果 && 数据。数据） {
              控制台。日志（`上架成功` ）
            } 其他 {
              控制台。日志（数据）
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

函数 chargeGold （） {
  let  body  =  `activityId = $ { ACT_ID }＆actorUuid = $ { $ 。actorUuid }＆pin = $ { encodeURIComponent （$ 。token ）} `
  返回 新的 Promise （resolve  =>  {
    $ 。发布（taskPostUrl （'dingzhi / book / develop / chargeGold' ， body ）， 异步 （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { ERR }，$ { jsonParse （RESP 。体）[ '消息' ] } ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            if  （数据。结果 && 数据。数据） {
              控制台。日志（`金币收获成功，获得$ {数据。数据。chargeGold } ` ）
            } 其他 {
              控制台。日志（数据。的errorMessage ）
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（数据）;
      }
    } ）
  } ）
}

函数 showMsg （） {
  返回 新的 Promise （resolve  =>  {
    message  + =  `本次运行获得积分$ { $ 。得分} ` ;
    $ 。MSG （$ 。名， '' ， `京东账号$ { $ 。索引} $ { $ 。昵称} \ n $ {消息} ` ）;
    解决（）
  } ）
}

函数 jdUrl （functionId ， body ） {
  返回 {
    url：`https : //api.m.jd.com/client.action? functionId = $ { functionId } ` ，
    身体：身体，
    标头：{
      '主机'：'api.m.jd.com' ，
      'accept'：'* / *' ，
      'user-agent'：'JD4iPhone / 167490（iPhone; iOS 14.2; Scale / 3.00）' ，
      'accept-language'：'zh-Hans-JP; q = 1，en-JP; q = 0.9，zh-Hant-TW; q = 0.8，ja-JP; q = 0.7，en-US; q = 0.6 ' ，
      'content-type'：'application / x-www-form-urlencoded' ，
      Cookie：Cookie
    }
  }
}

函数 taskUrl （function_id ， body ） {
  返回 {
    网址：`https : //lzdz-isv.isvjcloud.com/ $ { function_id }？$ { body } ` ，
    标头：{
      '主机'：'lzdz-isv.isvjcloud.com' ，
      '接受'：'application / x.jd-school-island.v1 + json' ，
      '来源'：'02' ，
      'Accept-Language'：'zh-cn' ，
      'Content-Type'：'application / json; charset = utf-8' ，
      'Origin'：'https : //lzdz-isv.isvjcloud.com' ，
      'User-Agent'：'JD4iPhone / 167490（iPhone; iOS 14.2; Scale / 3.00）' ，
      'Referer'：`https : //lzdz-isv.isvjcloud.com/dingzhi/book/develop/activity?activityId = $ { ACT_ID } ` ，
      'Cookie'：` $ { cookie } IsvToken = $ { $ 。isvToken } ;`
    }
  }
}

函数 taskPostUrl （function_id ， body ） {
  返回 {
    url：`https : //lzdz-isv.isvjcloud.com/ $ { function_id } ` ，
    身体：身体，
    标头：{
      '主机'：'lzdz-isv.isvjcloud.com' ，
      'Accept'：'application / json' ，
      'Accept-Language'：'zh-cn' ，
      'Content-Type'：'application / x-www-form-urlencoded' ，
      'Origin'：'https : //lzdz-isv.isvjcloud.com' ，
      'User-Agent'：'JD4iPhone / 167490（iPhone; iOS 14.2; Scale / 3.00）' ，
      'Referer'：`https : //lzdz-isv.isvjcloud.com/dingzhi/book/develop/activity?activityId = $ { ACT_ID } ` ，
      'Cookie'：` $ { cookie } isvToken = $ { $ 。isvToken } ;`
    }
  }
}

函数 TotalBean （） {
  返回 新的 Promise （异步 resolve  =>  {
    const  options  =  {
      “ url”：`https：//wq.jd.com/user/info/QueryJDUserInfo？sceneval = 2` ，
      “标题”：{
        “ Accept”：“ application / json，text / plain，* / *” ，
        “ Content-Type”：“ application / x-www-form-urlencoded” ，
        “ Accept-Encoding”：“ gzip，deflate，br” ，
        “ Accept-Language”：“ zh-cn” ，
        “连接”：“保持活动” ，
        “ Cookie”：cookie ，
        “ Referer”：“ https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2” ，
        “用户代理”：$ 。isNode （）？（过程。ENV 。JD_USER_AGENT？过程。ENV 。JD_USER_AGENT：（要求（'./USER_AGENTS' ）。 USER_AGENT ））：（$ 。的GetData （'JDUA' ）？ $ 。的GetData （'JDUA' ）： “jdapp; iPhone ; 9.2.2; 14.2;％E4％BA％AC％E4％B8％9C / 9.2.2 CFNetwork / 1206 Darwin / 20.1.0“）
      }
    }
    $ 。post （options ， （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { JSON 。字符串化（ERR ）} ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （数据） {
            data  =  JSON 。解析（数据）;
            if  （data [ 'retcode' ]  ===  13 ） {
              $ 。isLogin  =  false ;  // cookie过期
              返回
            }
            $ 。nickName  =  data [ 'base' ] 。昵称;
          } 其他 {
            控制台。日志（`京东服务器返回空数据` ）
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（）;
      }
    } ）
  } ）
}

//格式化助力码
函数 shareCodesFormat （） {
  返回 新的 Promise （异步 resolve  =>  {
    // console.log（`第$ {$。index}个京东账号的助力码:::: $ {$。shareCodesArr [$。index-1]}`）
    $ 。newShareCodes  =  [ ] ;
    如果 （$ 。shareCodesArr [ $ 。索引 -  1 ] ） {
      $ 。newShareCodes  =  $ 。shareCodesArr [ $ 。索引 -  1 ] 。分割（'@' ）;
    } 其他 {
      控制台。日志（`由于您第$ { $ 。指数}个京东账号未提供shareCode，将采纳本脚本自带的助力码\ N` ）
      const  tempIndex  =  $ 。index  > 邀请代码。长度？（inviteCodes 。长度 -  1 ）：（$ 。索引 -  1 ）;
      $ 。newShareCodes  = 邀请代码[ tempIndex ] 。分割（'@' ）;
    }
    const  readShareCodeRes  =  null  //等待readShareCode（）;
    如果 （readShareCodeRes  &&  readShareCodeRes 。代码 ===  200 ） {
      $ 。newShareCodes  =  [ ...新 集（[ ... $ 。newShareCodes ， ... （readShareCodeRes 。数据 ||  [ ] ）] ）] ;
    }
    控制台。日志（`第$ { $ 。指数}个京东账号将要助力的好友$ { JSON 。字符串化（$ 。newShareCodes ）} ` ）
    解决（）;
  } ）
}
函数 requireConfig （） {
  返回 新的 Promise （resolve  =>  {
    控制台。日志（`开始获取$ { $ 。名}配置文件\ N` ）;
    //Node.js用户请在jdCookie.js处填写京东ck;
    让 shareCodes  =  [ ]
    控制台。日志（`共$ { cookiesArr 。长度}个京东账号\ N` ）;
    $ 。shareCodesArr  =  [ ] ；
    如果 （$ 。isNode （）） {
      //自定义助力码
      如果 （过程。ENV 。BOOKSHOP_SHARECODES ） {
        如果 （过程。ENV 。BOOKSHOP_SHARECODES 。的indexOf （'\ n' ） >  - 1 ） {
          shareCodes  = 流程。ENV 。BOOKSHOP_SHARECODES 。分割（'\ n' ）;
        } 其他 {
          shareCodes  = 流程。ENV 。BOOKSHOP_SHARECODES 。分割（'＆' ）;
        }
      }
      对象。密钥（shareCodes ）。forEach （（项目） =>  {
        如果 （shareCodes [项目] ） {
          $ 。shareCodesArr 。推送（shareCodes [ item ] ）
        }
      } ）
    }
    控制台。日志（`您提供了$ { $ 。shareCodesArr 。长度}个账号的$ { $ 。名}助力码\ N` ）;
    解决（）
  } ）
}

函数 safeGet （数据） {
  尝试 {
    如果 （typeof运算 JSON 。解析（数据） ==  “对象” ） {
      返回 true ;
    }
  } 抓住 （e ） {
    控制台。log （e ）;
    控制台。日志（`京东服务器访问数据为空，请检查自身设备网络情况` ）；
    返回 false ;
  }
}

函数 jsonParse （str ） {
  如果 （typeof  str  ==  “ string” ） {
    尝试 {
      返回 JSON 。解析（str ）;
    } 抓住 （e ） {
      控制台。log （e ）;
      $ 。msg （$ 。name ， `` ， '不要在BoxJS手动复制粘贴修改cookie' ）
      返回 [ ] ;
    }
  }
}
//更漂亮的忽略
函数 Env （t ，e ）{类 s {构造函数（t ）{ this 。env = t } send （t ， e = “ GET” ）{ t = “ string” == typeof  t？{ url：t }：t ; 让 s = this 。得到; 返回“ POST” ===È && （小号=此。交），新 无极（（ê ，我）=> {小号。呼叫（这，吨，（吨，s ^ ，- [R ）=> {吨？我（吨）：È （小号）} ）} ）}得到（牛逼）{回报 这个。发送。调用（此。ENV ，牛逼）}后（牛逼）{返回 此。发送。电话（此。ENV ，牛逼，“POST” ）} }返回 新 类{构造函数（牛逼，ē ）{此。名字= t ，这个。http =新的 小号（本），这个。数据= null ，这。dataFile = “ box.dat” ，这个。原木= [ ] ，这个。isMute =！1 ，这个。isNeedRewrite =！1 ，这个。logSeparator = “ \ n” ，这个。startTime = （新 日期）。getTime （），对象。分配（此，ê ），此。日志（“” ，`\ ud83d \ udd14 $ {这个。名字}，\ u5f00 \ u59cb！' ）} isNode （）{返回“未定义”！= typeof运算 模块&& !! 模块。出口} isQuanX （）{返回“未定义”！= typeof运算 $ task } isSurge （）{返回“ undefined”！= typeof  $ httpClient && “ undefined” == typeof  $ loon } isLoon （）{返回“ undefined”！= typeof  $ loon } toObj （t ， e = null ）{尝试{返回 JSON 。解析（t ）} catch { return  e } }toStr （t ， e = null ）{试试{返回 JSON 。stringify （t ）} catch { return  e } } getjson （t ，e ）{让 s = e ; const  i = this 。getdata （t ）; 如果（i ）尝试{ s = JSON 。解析（此。的GetData （牛逼））}赶上{ }返回 小号} setjson （牛逼，ē ）{尝试{返回 此。使用setData （JSON 。字符串化（牛逼），ē ）}赶上{回报！1 } } getScript （t ）{返回 新的 Promise（é => {此。得到（{网址：牛逼} ，（牛逼，s ^ ，我）=> Ë （我））} ）}的runScript （牛逼，ē ）{返回 新的 承诺（小号=> {让 我=此。的GetData （“@ chavy_boxjs_userCfgs.httpapi” ）;我=我吗 我。替换（/ \ n / g ，“” ）。修剪（）：i ; 令 r = this 。getdata （“ @ chavy_boxjs_userCfgs.httpapi_timeout” ）；r = r？1 * r：20 ，r = e && e 。超时？e 。超时：r ; const [o ，h ] = i 。split （“ @” ），a = { url：`http：// $ { h } / v1 / scripting / evaluate` ，body：{ script_text：t ，mock_type：“ cron” ，超时：r } ，标头：{ “ X-Key”：o ，接受：“ * / *” } } ; 这个。发布（a ，（t ，e ，i ）=> s （i ））} ）。捕捉（吨=>此。LOGERR （吨））} loaddata （）{如果（！此。isNode （））返回{ } ; {这个。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：require （“ path” ）; const  t = this 。路径。解决（此。数据文件），ê =此。路径。解决（过程。CWD （），这个。dataFile ），s = this 。fs 。existSync （t ），我=！s && this 。fs 。existSync （e ）; 如果（！s &&！i ）返回{ } ; { const  i = s吗？t：e ; 试试{返回 JSON 。解析（此。FS 。readFileSync （我））}捕获（吨）{返回{ } } } } }写数据（）{如果（此。isNode （））{此。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：require （“ path” ）; const  t = this 。路径。解决（此。数据文件），ê =此。路径。解决（过程。CWD （），此。数据文件），š =此。fs 。existSync （t ），我=！s && this 。fs 。existSync （e ），r = JSON 。字符串化（此。数据）; s？这个。fs 。writeFileSync （t ，r ）：我？这个。fs 。writeFileSync （e ，r ）：这个。fs 。writeFileSync （t ，r ）} } lodash_get （t ，e ，s ）{ const  i = e 。替换（/ \ [ （\ d + ）\] / g ，“。$ 1” ）。split （“。” ）; 令 r = t ; 对于（const  t  of  i ）如果（r = Object （r ）[ t ] ，void  0 === r ）返回 s ; 返回 r } lodash_set （t ，e ，s ）{返回 Object （t ）！== t？吨：（阵列。IsArray的（ê ）|| （É = Ë 。的toString （）。匹配（/ [ ^。[ \] ] + / g ）|| [ ] ），e 。切片（0 ，- 1 ）。减少（（t ，s ，i ）=>对象（t [ s ] ）=== t [ s ]？t [ s ]：t [ s ]=数学。abs （e [ i + 1 ] ）>> 0 == + e [ i + 1 ]？[ ]：{ } ，t ）[ e [ e 。长度- 1 ] ] =小号，吨）}的GetData （吨）{让 Ë =此。getval （t ）; 如果（/ ^ @ / 。试验（吨））{常量[ ，s ^ ，我] = / ^ @ （。*？）\。（。*？）$ / 。exec （t ），r = s？这个。getval （s ）：“” ; 如果（r ）尝试{ const  t = JSON 。解析（r ）; Ë =吨？这个。lodash_get （t ，i ，“” ）：e } catch （t ）{ e = “” } }返回 e } setdata （t ，e ）{让 s =！1 ;如果（/ ^ @ / 。试验（ê ））{常量[ ，我，- [R ] = / ^ @ （。*？）\。（。*？）$ / 。exec （e ），o =此。getval （i ），h =我？“ null” === o？null：o || “ {}”：“ {}” ; 试试{ const  e = JSON 。解析（h ）; 这个。lodash_set （e ，r ，t ），s = this 。SETVAL （JSON 。字符串化（ê ），我）}捕获（É ）{常量 Ô = { }; 这个。lodash_set （o ，r ，t ），s = this 。SETVAL （JSON 。字符串化（ø ），我）} }否则 小号=此。setval （t ，e ）; 返回 s } getval （t ）{返回 这个。isSurge （）||这个。isLoon （）？$ persistentStore 。读（t ）：这个。isQuanX （）？$ prefs 。valueForKey （t ）：这个。isNode （）？（此。数据=此。loaddata （），此。数据[吨] ）：此。数据&&这个。数据[ t ] || 空} setval （t ，e ）{返回 这个。isSurge （）|| 这个。isLoon （）？$ persistentStore 。写（t ，e ）：这个。isQuanX （）？$ prefs 。setValueForKey （t ，e ）：这个。isNode （）？（此。数据=此。loaddata （），此。数据[ ë ] =吨，此。写数据（），！0 ）：此。数据&&此。数据[ e ] || null } initGotEnv （t ）{此。得到=这个。得到了？这个。得到了：require （“ got” ），这个。cktough =这个。cktough？这个。cktough：要求（“强硬曲奇” ），本。ckjar = this 。ckjar？这个。ckjar：新 本。cktough 。CookieJar ，吨&& （吨。标头= t 。标头？Ť 。标头：{ } ，无效 0 === t 。标头。Cookie && void  0 === t 。cookieJar && （吨。cookieJar =此。ckjar ））} GET （吨， ê = （（）=> { } ））{Ť 。头&& （删除 吨。标题[ “内容类型” ] ，删除 吨。标题[ “内容长度” ] ），该。isSurge （）|| 这个。isLoon （）？（此。isSurge （）&&此。isNeedRewrite && （吨。标题=吨。头|| { } ，对象。分配（t 。标头，{ “ X-Surge-Skip-Scripting”：！1 } ））），$ httpClient 。得到（牛逼，（牛逼，小号，我）=> {！牛逼&&小号&& （小号。身体=我，Ş 。的StatusCode =小号。状态），e （t ，s ，i ）} ））：这个。isQuanX （）？（此。isNeedRewrite && （牛逼。OPTS =牛逼。OPTS || { } ，对象，分配（牛逼。OPTS ，{提示：1 } ）），$任务。取（牛逼）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （null （{ status：s ，statusCode：i ，headers：r ，body：o } ，o ）} ，吨=> è （t ）））：这个。isNode （）&& （此。initGotEnv （吨），此。得到（吨）。在（“重定向” ，（吨，ê ）=> {尝试{如果（吨。标题[ “的Set-Cookie” ] ）{常量 s = t 。标头[“ set-cookie” ] 。映射（此。cktough 。曲奇。解析）。toString （）; 这个。ckjar 。setCookieSync （s ，null ），e 。cookieJar = this 。ckjar } }捕获（吨）{此。logErr （t ）} } ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （null ，{ status：s ，statusCode：i ，headers：r ，body：o } ，o ）}} ，t => { const {消息：s ，响应：i } = t ；È （小号，我，我&&我。体）} ））}后（吨， ê = （（）=> { } ））{如果（吨。体&&吨。标题&&！吨。标题[ “内容-类型“ ]&& （t 。标头[ “ Content-Type” ] = “ application / x-www-form-urlencoded” ），t 。标头&&删除 t 。标头[ “ Content-Length” ] ，此。isSurge （）|| 这个。isLoon （））这个。isSurge （）&&此。isNeedRewrite && （吨。标题=Ť 。标头|| { } ，对象。分配（t 。标头，{ “ X-Surge-Skip-Scripting”：！1 } ））），$ httpClient 。交（吨，（吨，小号，我）=> {！吨&&小号&& （小号。身体=我，š 。的StatusCode =小号。状态），e （t ，s ，i ）} ）; 否则 ，如果（这个。isQuanX （））牛逼。方法= “ POST” ，this 。isNeedRewrite && （吨。OPTS =吨。OPTS || { } ，对象。分配（吨。OPTS ，{提示：！1 } ））），$ task 。取（t ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （n（null ，{ status：s ，statusCode：i ，headers：r ，body：o } ，o ）} ，t => e （t ））; 否则 ，如果（这个。isNode （））{这个。initGotEnv （t ）; const { url：s ， ... i } = t ; 这个。得到了。发布（s ，i ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （null ，{ status：s ，statusCode：i ，headers：r ，body：o } ，o ）}} ，t => { const {消息：s ，响应：i } = t ；È （小号，我，我&&我。体）} ）} }时间（吨）{让 È = { “M +” ：（新 的日期）。得到月（）+ 1 ，“d +” ：（新 的日期）。getDate （），“H +” ：（新 日期）。调用getHours （），“M +” ：（新 日期）。getMinutes （），“S +” ：（新 日期）。getSeconds （），“ q +”：数学。地板（（（新 日期）。得到月（）+ 3 ） / 3 ），小号：（新 日期）。getMilliseconds （）} ；/ （ y + ） / 。测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，（（新 日期）。和getFullYear （）+ “” ）。 SUBSTR （4 -正则表达式。$ 1 。长度）））; 对于（让 小号 在 ë ）新的 正则表达式（“（” +小号+ “）” ）。 测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，1 ==正则表达式。$ 1 。长度？ë [小号]：（“00” + ë [小号] ）。substr （（“ + e [ s ] ）。length ））））;；返回 t } msg （ e = t ， s = “” ， i = “” ，r ）{ const  o = t => { if （！t ）返回 t ; 如果（“ string” == typeof t ）返回 这个。isLoon （）？t：这个。isQuanX （）？{ “ open-url”：t }：此。isSurge （）？{ url：t }：无效 0 ; 如果（“对象” == typeof运算 吨）{如果（此。isLoon （））{让 Ë =吨。openUrl || Ť 。网址|| t [ “ open-url” ] ，s = t 。mediaUrl || t [ “ media-url” ] ; 返回{的OpenURL：ê ，mediaUrl：小号} }如果（此。isQuanX （））{让 Ë =吨[ “开放-URL” ] || Ť。网址|| Ť 。openUrl ，s = t [ “ media-url” ] || Ť 。mediaUrl ; 返回{ “开网址”：é ，“媒体链接”：小号} }如果（这个。isSurge （））{让 é =牛逼。网址|| Ť 。openUrl || t [ “ open-url” ] ; 返回{ url：e } } } } ; 这个。isMute || （此。isSurge （）||此。isLoon （）？$通知。后（ē ，s ^ ，我，Ô （[R ））：此。isQuanX （）&& $通知（ē ，s ^ ，我，Ø（r ）））; 令 h = [ “” ，“ ============== \ ud83d \ udce3 \ u7cfb \ u7edf \ u901a \ u77e5 \ ud83d \ udce3 ============ ==“ ] ; ^ h 。推（e ），s && h 。推（s ），i && h 。推（i ），控制台。日志（^ h 。加入（“\ n” ）），这。日志= this 。日志。concat （h ）} log （ ... t ）{ t 。长度> 0 && （此。日志= [ ...此。原木， ...吨] ），控制台。日志（牛逼。加入（此。logSeparator ））} LOGERR （t ，e ）{ const  s =！这个。isSurge （）&&！这个。isQuanX （）&&！这个。isLoon （）; s？这个。日志（“” ，'\ u2757 \ ufe0f $ {这个。名字}，\ u9519 \ u8bef`！ ，牛逼。栈）：此。日志（“，`\ u2757 \ ufe0f $ {这。名称}，\ u9519 \ u8bef！` ，t ）} wait （t ）{返回 新的 Promise （e => setTimeout （e ，t ））}完成（ t = { } ）{ const  e = （new  Date ）。getTime （），s = （e-这个。startTime ） / 1e3 ; 这个。日志（“ ，” \ ud83d \ udd14 $ {这个。名称}，\ u7ed3 \ u675f！\ ud83d \ udd5b $ { s } \ u79d2` ），这个。日志（），（此。isSurge （）||此。isQuanX （）||此。isLoon （））&&$ done （t ）} } （t ，e ）}
