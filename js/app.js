const loadAiTools = async(dataLimit) => {
    // Fetch data from api
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools, dataLimit);
}

const displayAiTools = (tools, dataLimit) => {

    // Limit & conditions check
    const seeMore = document.getElementById('see-more');
    if(dataLimit && tools.length > dataLimit){
        tools = tools.slice(0, dataLimit);
    } else {
        seeMore.classList.add('d-none');
    }
    
    // Show data on home page
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.innerHTML = '';
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('tool-item');
        toolDiv.innerHTML = `
            <div class="tool-item-top">
                <div class="ai-tool-image mb-3"><img src="${tool.image}"></div>
                <h5 class="fw-bold">Features</h5>
                <ol class="features-list ps-0">${ tool.features.map(feature => feature? `<li>${feature}</li>` : 'N/A').join('') }</ol>
            </div>
            <div class="tool-item-bottom d-flex align-items-center justify-content-between">
                <div>
                    <h4 class="fw-bold">${tool.name}</h4>
                    <div class="published-in">
                        <i class="fa-solid fa-calendar-days me-1"></i>
                        <span class="">${tool.published_in}</span>
                    </div>
                </div>
                <div class="tool-button d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        `;
        toolsContainer.appendChild(toolDiv);
        loadingSpinner(false);
    });
}

//  By default calling 6 items
loadAiTools(6);

// See more display all data
document.getElementById('see-more').addEventListener('click', () => {
    loadingSpinner(true);
    loadAiTools();
});

// Loading spinner
const loadingSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}