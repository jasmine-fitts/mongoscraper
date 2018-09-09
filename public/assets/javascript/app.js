// $(document).ready(function() {
    
//     var articleContainer = $(".article-container");
//     $(document).on("click", ".btn.save", handleArticleSave);
//     $(document).on("click", ".scrape.new", handleArticleSave);

//     initPage();

//     function initPage() {

//         articleContainer.empty();
//         $.get("/api/headlines?saved=false")
//         .then(function(data) {
            
//             if (data && data.length) {
//                 renderArticles(data);
//             }
//             else {
//                 renderEmpty();
//             }
//         });
//     }

//     function renderArticles(articles) {
//         var articlePanels = [];

//         for (var i = 0; i < articles.length; i++) {
//             articlePanels.push(createPanel(articles[i]));
//         }
//         articleContainer.append(articlePanels);
//     }
//     function createPanel(article) {
//         var panel = 
//         $(["<div class = 'panel panel-default'>",
//                 "<div class = 'panel-heading'>",
//                 "<h3>",
//                 article.headline,
//                 "<a class = 'btn btn-success save'>",
//                 "Save Article",
//                 "</a>",
//                 "</h3>",
//                 "</div>",
//                 "<div class = 'panel-body'>",
//                 article.summary,
//                 "</div>",
//                 "/<div>"
//             ].join(""));

//             panel.data("_id", article._id);

//             return panel;
//     }

//     function renderEmpty() {
//         var emptyAlert =
//             $(["<div class = 'alert alert-warning text-center'>",
//                 "<h4>Sorry, no new articles.</h4>",
//                 "</div>",
//                 "<div class = 'panel panel-default'>",
//                 "<div class = 'panel-heading text-center'>",
//                 "<h3>What's next?</h3>",
//                 "</div>",
//                 "<div class = 'panel-body text-center'>",
//                 "<h4><a class = 'scrape-new'>Try Different Articles</a></h4>",
//                 "<h4><a href = '/saved/>Go to Saved Articles</a></h4>",
//                 "/<div>",
//                 "</div>"
//             ].join(""));

//         articleContainer.append(emptyAlert);
//     }

//     function handleArticleSave() {
//         var articleToSave = $(this).parents(".panel").data();
//         articleToSave.saved = true;

//         $.ajax({
//                 method: "PATCH",
//                 url: "/api/headlines",
//                 data: articleToSave
//             })
//             .then(function (data) {
//                 if (data.ok) {
//                     initPage();
//                 }
//             });
//     }
    
//     function handleArticleScrape() {
//         $.get("/api/fetch")
//             .then(function (data) {
//                 initPage();
//                 bootbox.alert("<h3 class = 'text-center m-top-80'>" + data.message + "</h3>");
//             });
//     }

// })

$(document).ready(function() {
    $("#news").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/news-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#arts").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/arts-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#music").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/music-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#topics").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/topics-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#programs").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/programs-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
  
    
    $.ajax({
        method: "GET",
        url: "/articles"
    })
    .then(function(data) {
        console.log(data);
    
        for (var i = 0; i < data.length; i++) {
            var articleCard = $("<div class='card m-3'></div>");
    
            var articleBody = $("<div class='card-body'></div>");
            var title = $("<h5 class='card-title'>" + data[i].title + "</h5>");
            var summary = $("<p class='card-text'>" + data[i].summary + "</p>");
            var link = $("<a class='btn btn-secondary' href=" + data[i].link + " target='_blank' role='button'>Read More</a>");
            var note = $("<button class='btn btn-secondary ml-2 notes' data-id=" + data[i]._id + " role='button'>Notes</button>");
    
            $("#articles").prepend(articleCard);
            articleCard.append(articleBody);
            articleBody.append(title);
            articleBody.append(summary);
            articleBody.append(link);
            articleBody.append(note);
        }
    });
    
    $(document).on("click", "button.notes", function(event) {
        event.preventDefault();
    
        var id = $(this).attr("data-id");
    
        $.ajax({
            method: "GET",
            url: "/articles/" + id
        })
        .then(function(data) {
            console.log(data);

            var noteCard = $("<div class='card m-3'></div>");
            var noteBody = $("<div class='card-body'></div>");
            var title = $("<h5 class='card-title'>" + data.title + "</h5>");
            var noteTitle = $("<input type='text' class='form-control' id='titleinput' name='title'>");
            var noteInput = $("<textarea type='text' class='form-control mt-3 mb-3' id='bodyinput' name='body'></textarea>");
            var saveNote = $("<button class='btn btn-secondary ml-2' data-id=" + data._id + " role='button' id='savenote'>Save Note</button>");
            var delNote = $("<button class='btn btn-secondary ml-2' data-id=" + data._id + " role='button' id='delete-note'>Delete Note</button>");

            $("#notes").append(noteCard);
            noteCard.append(noteBody);
            noteBody.append(title);
            noteBody.append(noteTitle);
            noteBody.append(noteInput);
            noteBody.append(saveNote);
            noteBody.append(delNote);

            if (data.note) {
              $("#titleinput").val(data.note.title);
              $("#bodyinput").val(data.note.body);
            }
            
        });
    });
    
    $(document).on("click", "#savenote", function(event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
      
        $.ajax({
          method: "POST",
          url: "/articles/" + id,
          data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
          }
        })
          .then(function(data) {
            console.log(data);
            $("#notes").empty();
          });
      
        $("#titleinput").val("");
        $("#bodyinput").val("");
      });

    $(document).on("click", "#delete-note", function(event) {
        event.preventDefault();

        var id = $(this).attr("data-id");

        $.ajax({
            method: "DELETE",
            url: "/articles/" + id
        })
        .then(function() {
            $("#notes").empty();
        });
    });
});