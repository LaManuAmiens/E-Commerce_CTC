function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();

  // règle le pb des caractères interdits
  if ('btoa' in window) {
    cvalue = btoa(cvalue);
  }

  document.cookie = cname + "=" + cvalue + "; " + expires+';path=/';
}
// La fonction prend trois paramètres : le nom du cookie, sa valeur et le nombre de jours avant que celui-ci n’expire.
// Petite explication pour la partie sur les caractères interdits. btoa permet d’encoder une chaine de caractère en base64,
// cela évite les problèmes de certains navigateurs avec les caractères non Unicode [en] (notamment Safari et les accents).
// Si la fonction est supportée dans le navigateur, on encode le contenu du cookie en base64.
function saveCart(inCartItemsNum, cartArticles) {
  setCookie('inCartItemsNum', inCartItemsNum, 5);
  setCookie('cartArticles', JSON.stringify(cartArticles), 5);
}
// On ne peut stocker que des chaines de caractères dans les cookies,
// on sérialise donc notre tableau cartArticles avec JSON.stringify avant de l’enregistrer.
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c[0] == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) != -1) {
      if ('btoa' in window) {
        return atob(c.substring(name.length,c.length));
      }
      else {
        return c.substring(name.length,c.length);
      }
    }
  }
  return false;
}
// Cette fonction prend en paramètre le nom du cookie et retourne sa valeur. Si btoa est supporté,
// cela veut dire qu’on a enregistré du base64 dans le cookie, on le retransforme alors en texte
// avec la fonction atob, sinon, on récupère simplement le texte non encodé.
var inCartItemsNum;
var cartArticles;

// affiche/cache les éléments du panier selon s'il contient des produits
function cartEmptyToggle() {
  if (inCartItemsNum > 0) {
    $('#cart-dropdown .hidden').removeClass('hidden');
    $('#empty-cart-msg').hide();
  }

  else {
    $('#cart-dropdown .go-to-cart').addClass('hidden');
    $('#empty-cart-msg').show();
  }
}

// récupère les informations stockées dans les cookies
inCartItemsNum = parseInt(getCookie('inCartItemsNum') ? getCookie('inCartItemsNum') : 0);
cartArticles = getCookie('cartArticles') ? JSON.parse(getCookie('cartArticles')) : [];

cartEmptyToggle();

// affiche le nombre d'article du panier dans le widget
$('#in-cart-items-num').html(inCartItemsNum);

// hydrate le panier
var items = '';
cartArticles.forEach(function(v) {
   items += '<li id="'+ v.id +'"><a href="'+ v.url +'">'+ v.name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a></li>';
});

$('#cart-dropdown').prepend(items);
// click bouton ajout panier
$('.add-to-cart').click(function() {

  // récupération des infos du produit
  var $this = $(this);
  var id = $this.attr('data-id');
  var name = $this.attr('data-name');
  var price = $this.attr('data-price');
  var weight = $this.attr('data-weight');
  var url = $this.attr('data-url');
  var qt = parseInt($('#qt').val());
  inCartItemsNum += qt;

  // mise à jour du nombre de produit dans le widget
  $('#in-cart-items-num').html(inCartItemsNum);

  var newArticle = true;

  // vérifie si l'article est pas déjà dans le panier
  cartArticles.forEach(function(v) {
    // si l'article est déjà présent, on incrémente la quantité
    if (v.id == id) {
      newArticle = false;
      v.qt += qt;
      $('#'+ id).html('<a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a>');
    }
  });

  // s'il est nouveau, on l'ajoute
  if (newArticle) {
    $('#cart-dropdown').prepend('<li id="'+ id +'"><a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ qt +'</span></small></a></li>');

    cartArticles.push({
      id: id,
      name: name,
      price: price,
      weight: weight,
      qt: qt,
      url: url
    });
  }

  // sauvegarde le panier
  saveCart(inCartItemsNum, cartArticles);

  // affiche le contenu du panier si c'est le premier article
  cartEmptyToggle();
});
// Avant d’attaquer cette partie, il est important d’avoir à l’esprit que l’ordinateur exécute ses calculs en base 2. Ainsi,
// chaque nombre se voit attribuer un espace mémoire fini. Cette contrainte résulte en de nombreux arrondis lors des calculs sur les nombres,
// lesquels peuvent impacter le résultat final… Particulièrement en JavaScript. Pour plus de détails techniques
// si on est sur la page ayant pour url monsite.fr/panier/
if (window.location.pathname == '/panier/') {
  var items = '';
  var subTotal = 0;
  var total;
  var weight = 0;

  /* on parcourt notre array et on créé les lignes du tableau pour nos articles :
  * - Le nom de l'article (lien cliquable qui mène à la fiche produit)
  * - son prix
  * - la dernière colonne permet de modifier la quantité et de supprimer l'article
  *
  * On met aussi à jour le sous total et le poids total de la commande
  */
  cartArticles.forEach(function(v) {
    // opération sur un entier pour éviter les problèmes d'arrondis
    var itemPrice = v.price.replace(',', '.') * 1000;
    items += '<tr data-id="'+ v.id +'">\
             <td><a href="'+ v.url +'">'+ v.name +'</a></td>\
             <td>'+ v.price +'€</td>\
             <td><span class="qt">'+ v.qt +'</span> <span class="qt-minus">–</span> <span class="qt-plus">+</span> \
             <a class="delete-item">Supprimer</a></td></tr>';
    subTotal += v.price.replace(',', '.') * v.qt;
    weight += v.weight * v.qt;
  });

  // on reconverti notre résultat en décimal
  subTotal = subTotal / 1000;

  // On insère le contenu du tableau et le sous total
  $('#cart-tablebody').empty().html(items);
  $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));

  // lorsqu'on clique sur le "+" du panier
  $('.qt-plus').on('click', function() {
    var $this = $(this);

    // récupère la quantité actuelle et l'id de l'article
    var qt = parseInt($this.prevAll('.qt').html());
    var id = $this.parent().parent().attr('data-id');
    var artWeight = parseInt($this.parent().parent().attr('data-weight'));

    // met à jour la quantité et le poids
    inCartItemsNum += 1;
    weight += artWeight;
    $this.prevAll('.qt').html(qt + 1);
    $('#in-cart-items-num').html(inCartItemsNum);
    $('#'+ id + ' .qt').html(qt + 1);

    // met à jour cartArticles
    cartArticles.forEach(function(v) {
        // on incrémente la qt
        if (v.id == id){
            v.qt += 1;

            // récupération du prix
            // on effectue tous les calculs sur des entiers
            subTotal = ((subTotal * 1000) + (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
        }
    });

    // met à jour la quantité du widget et sauvegarde le panier
    $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
    saveCart(inCartItemsNum, cartArticles);
  });

  // quantité -
  $('.qt-minus').click(function() {
    var $this = $(this);
    var qt = parseInt($this.prevAll('.qt').html());
    var id = $this.parent().parent().attr('data-id');
    var artWeight = parseInt($this.parent().parent().attr('data-weight'));

    if (qt > 1) {
      // maj qt
      inCartItemsNum -= 1;
      weight -= artWeight;
      $this.prevAll('.qt').html(qt - 1);
      $('#in-cart-items-num').html(inCartItemsNum);
      $('#'+ id + ' .qt').html(qt - 1);

      cartArticles.forEach(function(v) {
          // on décrémente la qt
          if (v.id == id) {
              v.qt -= 1;

              // récupération du prix
              // on effectue tous les calculs sur des entiers
              subTotal = ((subTotal * 1000) - (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
          }
      });

      $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
      saveCart(inCartItemsNum, cartArticles);
    }
  });

  // suppression d'un article
  $('.delete-item').click(function() {
    var $this = $(this);
    var qt = parseInt($this.prevAll('.qt').html());
    var id = $this.parent().parent().attr('data-id');
    var artWeight = parseInt($this.parent().parent().attr('data-weight'));
    var arrayId = 0;
    var price;

    // maj qt
    inCartItemsNum -= qt;
    $('#in-cart-items-num').html(inCartItemsNum);

    // supprime l'item du DOM
    $this.parent().parent().hide(600);
    $('#'+ id).remove();

    cartArticles.forEach(function(v) {
        // on récupère l'id de l'article dans l'array
        if (v.id == id) {
            // on met à jour le sous total et retire l'article de l'array
            // as usual, calcul sur des entiers
            var itemPrice = v.price.replace(',', '.') * 1000;
            subTotal -= (itemPrice * qt) / 1000;
            weight -= artWeight * qt;
            cartArticles.splice(arrayId, 1);

            return false;
        }
        arrayId++;
    });

    $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
    saveCart(inCartItemsNum, cartArticles);
    cartEmptyToggle();
  });
}
