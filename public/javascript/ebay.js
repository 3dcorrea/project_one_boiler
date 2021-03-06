$.backstretch('../images/background.gif');


$(() => {
  $('[data-toggle="popover"]').popover();
});

$(document).on('click', '.ebay-output', () => {
  $(() => {
    $('.ebay-output').popover();
  });
});

function truncate(string, x) {
  if (string.length > x) {
    y = string.substring(0, x);
    return `${y} (. . .) `;
  }
  return string;
}

function prettyU(string) {
  if (string === undefined) {
    return 'No Item Summary';
  }

  return string;
}

let searchTerm = '';
function ebaySearch() {
  const queryURL = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${searchTerm}`;

  $.ajax({
    url: queryURL,
    method: 'GET',
    dataType: 'JSONP',
  }).then((response) => {
    for (i = 0; i < response.findItemsByKeywordsResponse[0].searchResult[0].item.length; i++) {
      const newDiv = $('<div>');
      newDiv.html(response.findItemsByKeywordsResponse[0].searchResult[0].item[i].title);
      newDiv.attr('class', 'col-8 ebay-output');
      newDiv.attr('data-content', `<a> Price:  $${response.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__}</a> <br> <img height='140px' src=${response.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL}>`);
      newDiv.attr('data-toggle', 'popover');
      newDiv.attr('data-trigger', 'focus');
      newDiv.attr('data-placement', 'right');
      newDiv.attr('tabindex', 0);
      newDiv.attr('title', response.findItemsByKeywordsResponse[0].searchResult[0].item[i].title);
      newDiv.attr('data-html', 'true');
      newDiv.appendTo('#outputrow');
    }
  });
}

$('#searchBTN').click((event) => {
  event.preventDefault();
  $('#outputrow').empty();
  searchTerm = $('#input').val();
  ebaySearch();
});

$('#input').keypress(() => {
  const keycode = (event.keyCode ? event.keyCode : event.which);

  if (keycode == '13') {
    event.preventDefault();
    $('#outputrow').empty();
    searchTerm = $('#input').val();
    ebaySearch();
  }
});
