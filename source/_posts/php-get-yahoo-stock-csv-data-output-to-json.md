---
title: php 获取yahoo股票csv数据并封闭成为接口输出json数据
date: 2016-06-24 11:02:17
tags:
  - 后端 
  - php
---
### 思路
先从yahoo接口获取数据，再转化成为json输出   

### stock.php 文件添加处理函数代码，如下  
<!-- more -->
```php

<?php
header("Content-Type: application:json;charset=utf-8");
header('Access-Control-Allow-Origin:http://www.checkcool.com');  //只允许checkcool.com这域名进行跨域get访问
header('Access-Control-Allow-Methods:GET');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

$StockName=$_REQUEST['stockname'];
$StartDateArr=explode("-",$_REQUEST['startdate']);
$EndDateArr=explode("-",$_REQUEST['enddate']);

$StartMonth=$StartDateArr[1] - 1;
$StartDay=$StartDateArr[2];
$StartYear=$StartDateArr[0];
$EndMonth=$EndDateArr[1] - 1;
$EndDay=$EndDateArr[2];
$EndYear=$EndDateArr[0];
$StockAPI = 'http://table.finance.yahoo.com/table.csv?s='.$StockName.'&f='.$EndYear.'&d='.$EndMonth.'&e='.$EndDay.'&c='.$StartYear.'&a='.$StartMonth.'&b='.$StartDay.'&g=d&ignore=.csv';//定义stock api的url
$StockData = json_encode(csv_in_array($StockAPI,",","",true));//定义值为读取到的Stock信息
// echo '<pre>';//输出原文本格式
echo $StockData;//输出获取到的stock信息文本
// echo "</pre>";//输出原文本格式

function csv_in_array($url,$delm=",",$encl="",$head=true) { 
    
    $csvxrow = file($url);   // ---- csv rows to array ----
    
    $csvxrow[0] = chop($csvxrow[0]); 
    $csvxrow[0] = str_replace($encl,'',$csvxrow[0]); 
    $keydata = explode($delm,$csvxrow[0]); 
    $keynumb = count($keydata); 
    
    if ($head === true) { 
    $anzdata = count($csvxrow); 
    $z=0; 
    for($x=1; $x<$anzdata; $x++) { 
        $csvxrow[$x] = chop($csvxrow[$x]); 
        $csvxrow[$x] = str_replace($encl,'',$csvxrow[$x]); 
        $csv_data[$x] = explode($delm,$csvxrow[$x]); 
        $i=0; 
        foreach($keydata as $key) { 
            $out[$z][$key] = $csv_data[$x][$i]; 
            $i++;
            }    
        $z++;
        }
    }
    else { 
        $i=0;
        foreach($csvxrow as $item) { 
            $item = chop($item); 
            $item = str_replace($encl,'',$item); 
            $csv_data = explode($delm,$item); 
            for ($y=0; $y<$keynumb; $y++) { 
               $out[$i][$y] = $csv_data[$y]; 
            }
        $i++;
        }
    }

return $out; 
}


?>

```
