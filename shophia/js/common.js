var Menu={el:{ham:$("#btnMnu"),menuTop:$(".menu-top"),menuMiddle:$(".menu-middle"),menuBottom:$(".menu-bottom")},init:function(){Menu.bindUIactions()},bindUIactions:function(){Menu.el.ham.on("click",function(e){Menu.activateMenu(e),e.preventDefault()})},activateMenu:function(){Menu.el.menuTop.toggleClass("menu-top-click"),Menu.el.menuMiddle.toggleClass("menu-middle-click"),Menu.el.menuBottom.toggleClass("menu-bottom-click")}};Menu.init(),$(function(){$(".top-bar__btn").click(function(){$(".top-bar").toggleClass("active"),$(this).toggleClass("active")}),$("#btnMnu").click(function(){$(".main-menu").toggleClass("active"),$(".burger-wrapp").toggleClass("active")}),$(".slider").slick({infinite:!0,speed:500,fade:!0,cssEase:"linear",dots:!0,arrows:!1}),$(window).on("load",function(){$(".preloader").delay(2000).fadeOut("slow")})});