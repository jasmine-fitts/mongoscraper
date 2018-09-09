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
    
    $("#race").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/race-scrape"
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