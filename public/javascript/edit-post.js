async function editFormHandler(event) {
    event.preventDefault();

    // get the content in the text areas
    const title = document.querySelector('input[name="user-post-title"]').value.trim();
    const post_comment = document.querySelector('input[name="user-post-content"]').value.trim();

    // get the id of the post from the url
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(title, post_comment, post_id);

    const response = await fetch(`/api/posts/${post_id}`, {
        method:'PUT',
        body: JSON.stringify({
            title,
            post_comment
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard/');
    }else{
        alert(response.statusText)
    }
}
  
document.querySelector('#save-post-btn').addEventListener('submit', editFormHandler);