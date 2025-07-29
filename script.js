// Sample initial data structure
let ideasData = {
    ideas: []
};

// Load ideas from localStorage or initialize
function loadIdeas() {
    const savedIdeas = localStorage.getItem('ideasData');
    if (savedIdeas) {
        ideasData = JSON.parse(savedIdeas);
    }
    renderIdeas();
}

// Save ideas to localStorage
function saveIdeas() {
    localStorage.setItem('ideasData', JSON.stringify(ideasData));
}

// Render all ideas to the page
function renderIdeas() {
    const ideasContainer = document.getElementById('ideas-container');
    ideasContainer.innerHTML = '';

    if (ideasData.ideas.length === 0) {
        ideasContainer.innerHTML = '<p>No ideas posted yet. Be the first to share!</p>';
        return;
    }

    ideasData.ideas.forEach((idea, index) => {
        const ideaElement = document.createElement('div');
        ideaElement.className = 'idea-card';
        ideaElement.innerHTML = `
            <h3 class="idea-title">${idea.title}</h3>
            <p class="idea-content">${idea.content}</p>
            <p class="idea-meta">Posted on ${new Date(idea.date).toLocaleString()}</p>
            
            <div class="comment-section">
                <h4>Comments (${idea.comments.length})</h4>
                
                ${idea.comments.map(comment => `
                    <div class="comment">
                        <p><strong>${comment.author}</strong> said:</p>
                        <p>${comment.content}</p>
                        <p class="idea-meta">${new Date(comment.date).toLocaleString()}</p>
                    </div>
                `).join('')}
                
                <form class="comment-form" data-idea-index="${index}">
                    <input type="text" placeholder="Your name" class="comment-author" required>
                    <textarea placeholder="Your comment" class="comment-content" required></textarea>
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        `;
        
        ideasContainer.appendChild(ideaElement);
    });

    // Add event listeners to comment forms
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const ideaIndex = parseInt(this.getAttribute('data-idea-index'));
            const author = this.querySelector('.comment-author').value;
            const content = this.querySelector('.comment-content').value;
            
            addComment(ideaIndex, author, content);
            
            // Reset form
            this.querySelector('.comment-author').value = '';
            this.querySelector('.comment-content').value = '';
        });
    });
}

// Add a new idea
function addIdea(title, content) {
    const newIdea = {
        title,
        content,
        date: new Date().toISOString(),
        comments: []
    };
    
    ideasData.ideas.unshift(newIdea); // Add to beginning of array
    saveIdeas();
    renderIdeas();
}

// Add a comment to an idea
function addComment(ideaIndex, author, content) {
    const newComment = {
        author,
        content,
        date: new Date().toISOString()
    };
    
    ideasData.ideas[ideaIndex].comments.push(newComment);
    saveIdeas();
    renderIdeas();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadIdeas();
    
    // Idea form submission
    document.getElementById('idea-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('idea-title').value;
        const content = document.getElementById('idea-content').value;
        
        addIdea(title, content);
        
        // Reset form
        this.reset();
    });
});

// Show/hide post idea section based on auth status
function togglePostSection(isLoggedIn) {
    const postSection = document.getElementById('post-idea-section');
    if (isLoggedIn) {
        postSection.classList.remove('hidden');
    } else {
        postSection.classList.add('hidden');
    }
}
