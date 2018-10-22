$(function(){

var price = $(".price-container").val();
var quantite = $(".quantite").val();
var totalPrice = price*quantite

  $('#ajout').click(function(){
      $('#card1').removeAttr('hidden', 'show');
  $('#deletecard1').click(function(){
      $('#card1').hide();
  });
});
  $('#ajout2').click(function(){
      $('#card2').removeAttr('hidden', 'show');
  $('#deletecard2').click(function(){
      $('#card2').hide();
  });
});
  $('#ajout3').click(function(){
    $('#card3').removeAttr('hidden', 'show');
  $('#deletecard3').click(function(){
    $('#card3').hide();
  });
});
  $('#ajout4').click(function(){
    $('#card4').removeAttr('hidden', 'show');
  $('#deletecard4').click(function(){
    $('#card4').hide();
  });
});
  $('#ajout5').click(function(){
    $('#card5').removeAttr('hidden', 'show');
  $('#deletecard5').click(function(){
    $('#card5').hide();
  });
});
  $('#ajout6').click(function(){
    $('#card6').removeAttr('hidden', 'show');
  $('#deletecard6').click(function(){
    $('#card6').hide();
  });
});
  $('#ajout7').click(function(){
    $('#card7').removeAttr('hidden', 'show');
  $('#deletecard7').click(function(){
    $('#card7').hide();
  });
});
  $('#ajout8').click(function(){
    $('#card8').removeAttr('hidden', 'show');
  $('#deletecard8').click(function(){
    $('#card8').hide();
  });
});
  $('#ajout9').click(function(){
    $('#card9').removeAttr('hidden', 'show');
  $('#deletecard9').click(function(){
    $('#card9').hide();
  });
});
// calcul du prix avant de commander
$('#commander').click(function(){
    var pdt1 = 4000;
    var quantite = $("#qt1").val();
    var totalPrice1 = pdt1*quantite;
    var pdt2 = 1000;
    var quantite = $("#qt2").val();
    var totalPrice2= pdt2*quantite;
    var pdt3 = 890;
    var quantite = $("#qt3").val();
    var totalPrice3 = pdt3*quantite;
    var pdt4 = 1565;
    var quantite = $("#qt4").val();
    var totalPrice4 = pdt4*quantite;
    var pdt5 = 249;
    var quantite = $("#qt5").val();
    var totalPrice5 = pdt5*quantite;
    var pdt6 = 735;
    var quantite = $("#qt6").val();
    var totalPrice6 = pdt6*quantite;
    var pdt7 = 525;
    var quantite = $("#qt7").val();
    var totalPrice7 = pdt7*quantite;
    var pdt8 = 535;
    var quantite = $("#qt8").val();
    var totalPrice8 = pdt8*quantite;
    var pdt9 = 735;
    var quantite = $("#qt9").val();
    var totalPrice9 = pdt9*quantite;
    var totalPrice = (totalPrice1 + totalPrice2 + totalPrice3 + totalPrice4 + totalPrice5 + totalPrice5 + totalPrice6 + totalPrice7 + totalPrice8 + totalPrice9)
    alert(totalPrice + '€');
});
});
$(function(){
  // au survol de l'image, une deuxième image apparait
  $('#parka').mouseover(function(){
    $(this).attr("src", "assets/img/parkasl.jpg");
  // lorsque la souris sort de l'image, celle d'origine revient
  }).mouseout(function(){
    $(this).attr("src", "assets/img/blouson.jpg");
  });
  $('#pull').mouseover(function(){
    $(this).attr("src", "assets/img/sweatsl.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/pull.jpg");
  });
  $('#sac').mouseover(function(){
    $(this).attr("src", "assets/img/sacsl.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/sac.jpg");
  });
  $('#jacket').mouseover(function(){
    $(this).attr("src", "assets/img/Kenzo_leather_back.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/Kenzo_leather.jpg");
  });
  $('#tiger').mouseover(function(){
    $(this).attr("src", "assets/img/kenzo_tiger_back.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/kenzo_tiger.jpg");
  });
  $('#backpack').mouseover(function(){
    $(this).attr("src", "assets/img/kenzon_backpack_back.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/kenzon_backpack.jpg");
  });
  $('#mountain').mouseover(function(){
    $(this).attr("src", "assets/img/the2.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/the.jpg");
  });
  $('#watanabe').mouseover(function(){
    $(this).attr("src", "assets/img/thenorthface.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/north.jpg");
  });
  $('#windstopper').mouseover(function(){
    $(this).attr("src", "assets/img/thenorth2.jpg");
  }).mouseout(function(){
    $(this).attr("src", "assets/img/thenorth.jpg");
  });
});
