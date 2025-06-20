let showSubscriptions = false;

function filterNews() {
    const newsItems = document.querySelectorAll('#newsList li');
    const selectedAuthor = document.getElementById('authorFilter').value;
    const selectedTopic = document.getElementById('topicFilter').value;

    newsItems.forEach(item => {
        const author = item.getAttribute('data-author');
        const topic = item.getAttribute('data-topic');
        const isSubscribed = (showSubscriptions && (author === 'Фермер А' || author === 'Фермер Б'));

        const authorMatch = selectedAuthor === '' || author === selectedAuthor;
        const topicMatch = selectedTopic === '' || topic === selectedTopic;
        const subscriptionMatch = !showSubscriptions || isSubscribed;

        if (authorMatch && topicMatch && subscriptionMatch) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function likePost(button) {
    const countElement = button.nextElementSibling.querySelector('.count');
    let count = parseInt(countElement.innerText);
    countElement.innerText = count + 1;
}

document.getElementById('addAdButton').onclick = function() {
    document.getElementById('modal').style.display = 'block';
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('showSubscriptionsButton').onclick = function() {
    showSubscriptions = true;
    document.getElementById('authorFilter').value = '';
    document.getElementById('topicFilter').value = '';
    filterNews();
}

document.getElementById('showAllNewsButton').onclick = function() {
    showSubscriptions = false;
    document.getElementById('authorFilter').value = '';
    document.getElementById('topicFilter').value = '';
    filterNews();
}

document.getElementById('adForm').onsubmit = function(event) {
    event.preventDefault();

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const topic = document.getElementById('topic').value;

    const newsList = document.getElementById('newsList');
    const newItem = document.createElement('li');
    newItem.setAttribute('data-author', author);
    newItem.setAttribute('data-topic', topic);
    
    newItem.innerHTML = `
        <div><strong>${author}</strong><br>${title}<br>${description}</div>
        <div style="display:flex; align-items:center;">
            <button class="like-button" onclick="likePost(this)">
                ❤️ Лайк
            </button>
            <span class="like-count">Лайков: <span class="count">0</span></span>
        </div>`;
    
    newsList.appendChild(newItem);
    document.getElementById('modal').style.display = 'none';
    this.reset();
    filterNews();
}

function goHome() {
    window.location.href = 'Untitled-1.html';
}

// Изначально показываем все новости
filterNews();