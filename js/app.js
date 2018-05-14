const $page = $('.page');
const $header = $('.page-header'); 
const $ul = $('.student-list');
const $liList = $('.student-list li');

function pageNums(x) {
    const pages = Math.ceil(x.length / 10);
    return pages;
}

//SEARCHBOX
const $search = $('<div class="student-search"></div>')
$header.append($search);

let searchBox = '<input type="text" id="filter_search" placeholder="Search for students...">';
searchBox += '<button>Search</button>';

$search.html(searchBox);

//Show first 10 students

$('li').remove();
$ul.append($liList.slice(0, 10));

// Create anchors
const createAnchors = (list) => {
    const pages = pageNums(list);
    const $paginationDiv = $('<div class="pagination"><ul></ul></div>');
    $page.append($paginationDiv);
    for(let i = 1; i < pages + 1; i++) {
        let $button = $('<li><a href="#">' + i + '</a></li>')
        $('.pagination ul').append($button);
    }
}

createAnchors($liList);
$('.pagination').find('a').first().addClass('active');

// New character in the searchbox or page button has been pressed

$("#filter_search").keyup(function () {
    $('li').remove();
    $('.pagination').remove();
    $('#noMatches').remove();
    let $inputValue = $('#filter_search').val();
    let $result = $liList.contents().find('h3:contains("' + $inputValue + '")').parent().parent();
    if($result.length === 0) {
        const noMatches = '<div class="page-header"><h2 id="noMatches">No Matches</h2></div>';
        $ul.html(noMatches);
    } else {
        $ul.append($result.slice(0, 10));
        createAnchors($result); 
        $('.pagination').find('a').first().addClass('active');
    }
});

$page.on('click', (e) => {
    if(e.target.tagName === 'A') {
        $('.student-list li').remove();
        let page = e.target;
        let pageNumber = parseInt(page.textContent);
        let $allPages = $('.pagination').find('a');
        $('.pagination').find('a').removeClass('active');
        $(page).addClass('active');
        let $inputValue = $('#filter_search').val();
        let $result = $liList.contents().find('h3:contains("' + $inputValue + '")').parent().parent();
        if(pageNumber < $allPages.length) {
            $ul.append($result.slice((pageNumber - 1) * 10, pageNumber * 10));
        } else if (pageNumber === $allPages.length) {
            $ul.append($result.slice((pageNumber - 1) * 10, $result.length));
        } 
    }
});

























