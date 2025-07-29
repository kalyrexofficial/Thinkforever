// Remove all auth-related functions
// Keep only these core functions:

function loadIdeas() { /* same as before */ }
function saveIdeas() { /* same as before */ }
function renderIdeas() { /* same as before */ }
function addIdea(title, content) { /* same as before */ }
function addComment(ideaIndex, author, content) { /* same as before */ }

// Update DOMContentLoaded to remove auth checks
document.addEventListener('DOMContentLoaded', () => {
    loadIdeas();
    
    document.getElementById('idea-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('idea-title').value;
        const content = document.getElementById('idea-content').value;
        addIdea(title, content);
        this.reset();
    });
});
