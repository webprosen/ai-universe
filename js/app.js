// Load all ai tools
const loadAiTools = async(dataLimit) => {
    // Fetch data from api
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools, dataLimit);
}

//  Display all ai tools
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
                <div id="tool-button" onclick="loadToolDetails('${tool.id}')" class="d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#toolModal">
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

// See more to display all data
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

// Load single item tool
const loadToolDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayToolDetails(data.data)
}

const displayToolDetails = tool => {
    // Modal description
    const toolDescription = document.getElementById('tool-description');
    toolDescription.innerText = tool.description;

    // Modal Pricing
    const planPrice1 = document.getElementById('plan-price-1');
    planPrice1.innerText = tool.pricing? tool.pricing[0].price : 'Free of Cost';
    const planName1 = document.getElementById('plan-name-1');
    planName1.innerText = tool.pricing? tool.pricing[0].plan : 'Basic';

    const planPrice2 = document.getElementById('plan-price-2');
    planPrice2.innerText = tool.pricing? tool.pricing[1].price : 'Free of Cost';
    const planName2 = document.getElementById('plan-name-2');
    planName2.innerText = tool.pricing? tool.pricing[1].plan : 'Pro';

    const planPrice3 = document.getElementById('plan-price-3');
    planPrice3.innerText = tool.pricing? tool.pricing[2].price : 'Free of Cost';
    const planName3 = document.getElementById('plan-name-3');
    planName3.innerText = tool.pricing? tool.pricing[2].plan : 'Enterprise';


    // Modal features data
    const modalFeatures = document.getElementById('modal-features');
    if(tool.features != null){
        modalFeatures.innerHTML = '';
        for(const feature of Object.values(tool.features)){
            const li = document.createElement('li');
            li.textContent = feature.feature_name;
            modalFeatures.appendChild(li);
        }
    } else {
        modalFeatures.innerHTML = 'No data found';
        modalFeatures.classList.add('ps-0');
    }

    // Modal Integrations data
    const modalIntegrations = document.getElementById('modal-integrations');
    if(tool.integrations != null){
        modalIntegrations.innerHTML = '';
        for(const integration of tool.integrations){
            const li = document.createElement('li');
            li.textContent = integration;
            modalIntegrations.appendChild(li);
        }
    } else {
        modalIntegrations.innerHTML = 'No data found';
        modalIntegrations.classList.add('ps-0');
    }

    // Modal image
    const modalImage = document.getElementById('modal-image');
    modalImage.setAttribute('src' , tool.image_link[0]);

    // Image accuracy badge 
    const accuracyBadge = document.getElementById('accuracy-badge');
    const accuracyScore = document.getElementById('accuracy-score');
    if(tool.accuracy.score != null){
        accuracyBadge.classList.remove('d-none');
        accuracyScore.innerText = tool.accuracy.score;
    } else {
        accuracyBadge.classList.add('d-none');
    }
    
    // Question & answer
    const ques = document.getElementById('question');
    const ans = document.getElementById('answer');
    ques.innerText = tool.input_output_examples? tool.input_output_examples[0].input : 'Can you give any example?';
    ans.innerText = tool.input_output_examples? tool.input_output_examples[0].output : 'No! Not Yet! Take a break!!!';
}