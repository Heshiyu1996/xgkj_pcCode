/**
 * Created by USER on 2016/11/28.
 */
$(document).ready(function () {
    $(".theBuyer").click(function () {
        $(".buyerTwo").toggle();
        $(".sellerTwo").hide();
        $(".text21").show();
        $(".text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text13,.text14,.text15,.text16,.text17,.text18,.text19").hide();
        $(".theBuyer").css("background-color", "white");
        $(".theSeller").css("background-color", "#f3f3f3");
    });
//        加了二，四
    $(".theSeller,#sell").click(function () {
        $(".sellerTwo").toggle();
        $(".buyerTwo").hide();
        $(".text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text13,.text14,.text15,.text16,.text17,.text18,.text19").hide();
        $(".text21").show();
        $(".theSeller").css("background-color", "white");
        $(".theBuyer").css("background-color", "#f3f3f3");
    });
    $("#buyer,.sell").click(function () {
        $(".sellerTwo").hide();
        $(".buyerTwo").hide();
        $(".theSeller").css("background-color", "#f3f3f3");
        $(".theBuyer").css("background-color", "#f3f3f3");
        $("#buyer").css("background-color", "#2E426C");
        $("#buyer").css("color", "white");
        $("#owner,#seller,#treasure").css("color", "#337ab7");
        $("#owner,#seller,#treasure").css("background-color", "white");
        $(".text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text13,.text14,.text15,.text16,.text17,.text18,.text19").hide();
        $("#list2,#list3,#list4").hide();
        $("#list1,.list").show();
        $(".text21").show();
    });

    $("#seller,.sellout").click(function () {
        $("#seller").css("background-color", "#2E426C");
        $("#seller").css("color", "white");
        $("#owner,#buyer,#treasure").css("color", "#337ab7");
        $("#owner,#buyer,#treasure").css("background-color", "white");
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $("#list1,#list3,#list4").hide();
        $(".list").hide();
        $(".text12").show();
    });
    $(".sellout").click(function () {
        //$("button.sell").val("123");
        $("#sell").attr("value",'11');//填充内容
    });
    $("#owner").click(function () {
        $("#owner").css("background-color", "#2E426C");
        $("#owner").css("color", "white");
        $("#seller,#buyer,#treasure").css("color", "#337ab7");
        $("#seller,#buyer,#treasure").css("background-color", "white");
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".list").show();
        $("#list1").hide();
        $("#list2").hide();
        $("#list3").hide();
        $("#list4").show();
        $(".text13").show();
    });
    $("#treasure").click(function () {
        $("#treasure").css("background-color", "#2E426C");
        $("#treasure").css("color", "white");
        $("#seller,#buyer,#owner").css("color", "#337ab7");
        $("#seller,#buyer,#owner").css("background-color", "white");
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text14,.text15,.text16,.text13,.text18,.text19,.text21").hide();
        $(".list").show();
        $("#list1").hide();
        $("#list2").hide();
        $("#list4").hide();
        $("#list3").show();
        $(".text17").show();
    });
    $(".choose1").click(function () {
        $(".text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text1").show();
    });
    $(".choose2").click(function () {
        $(".text1,.text3,.text4,.text5,.text6,.text7,.text8,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text2").show();
    });
    $(".choose3").click(function () {
        $(".text1,.text2,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text3").show();
    });
    $(".choose5").click(function () {
        $(".text1,.text2,.text3,.text4,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text5").show();
    });
    $(".choose6").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text6").show();
    });
    $(".choose7").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text7").show();
    });
    $(".choose8").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text8").show();
    });
    $(".choose8s,.sell").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text9,.text8," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text8s").show();
    });
    $(".choose9").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text9").show();
    });
    $(".choose10").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text12,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text10").show();
    });
    $(".choose12").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,text13,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text12").show();
    });
    $(".choose13").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text14,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text13").show();
    });
    $(".choose14").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text13,.text15,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text14").show();
    });
    $(".choose15").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text13,.text14,.text16,.text17,.text18,.text19,.text21").hide();
        $(".text15").show();
    });
    $(".choose16").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,.text13,.text14,.text15,.text17,.text18,.text19,.text21").hide();
        $(".text16").show();
    });
    $(".choose17").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text18,.text19,.text21").hide();
        $(".text17").show();
    });
    $(".choose18").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text19,.text21").hide();
        $(".text18").show();
    });
    $(".choose19").click(function () {
        $(".text1,.text2,.text3,.text4,.text5,.text6,.text7,.text8,.text8s,.text9," +
            ".text10,.text12,text13,.text14,.text15,.text16,.text17,.text18,.text21").hide();
        $(".text19").show();
    });
    $(".theBuyer").click(function () {
        $(".text1").hide();
        $(".text2").hide();
    });
    $(".theSeller").click(function () {
        $(".text1").hide();
        $(".text2").hide();
    });
    $(".circle1").click(function () {
        $(".circle1").css("background-color","#2E426C");
        $(".circle2").css("background-color","#ffffff");
        $(".circle3").css("background-color","#ffffff");
        $(".circle4").css("background-color","#ffffff");
        $(".circle5").css("background-color","#ffffff");

    });
    $(".circle2").click(function () {
        $(".circle1").css("background-color","#2E426C");
        $(".circle2").css("background-color","#2E426C");
        $(".circle3").css("background-color","#ffffff");
        $(".circle4").css("background-color","#ffffff");
        $(".circle5").css("background-color","#ffffff");
    });
    $(".circle3").click(function () {
        $(".circle1").css("background-color","#2E426C");
        $(".circle2").css("background-color","#2E426C");
        $(".circle3").css("background-color","#2EB3BA");
        $(".circle4").css("background-color","#ffffff");
        $(".circle5").css("background-color","#ffffff");
    });
    $(".circle4").click(function () {
        $(".circle1").css("background-color","#2E426C");
        $(".circle2").css("background-color","#2E426C");
        $(".circle3").css("background-color","#2E426C");
        $(".circle4").css("background-color","#2E426C");
        $(".circle5").css("background-color","#ffffff");
    });
    $(".circle5").click(function () {
        $(".circle1").css("background-color","#2E426C");
        $(".circle2").css("background-color","#2E426C");
        $(".circle3").css("background-color","#2E426C");
        $(".circle4").css("background-color","#2E426C");
        $(".circle5").css("background-color","#2E426C");
    });
    //$("#patent_name").click(function(){
    //    M_patent.getListByOne();
    // $(".patentbox ul").toggle();
    //})

});
//array2[0]=new Array("1","0","车身");
//array2[1]=new Array("2","0","车灯");
//array2[2]=new Array("25","11","空气滤清器");
//array2[3]=new Array("11","1","配气机构");