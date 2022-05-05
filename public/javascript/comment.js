// function to add a comment
async function commentFormHandler(event){
    event.preventDefault();

    // get the text from the text area
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // get the id of the post from the url
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(comment_text, post_id);
    if(comment_text){
        const response = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.comment_form').addEventListener('submit', commentFormHandler);