const COCKPIT_API_URL = "http://shc-cms.eu/api"

class CockpitAPI {
  constructor() {
    this.baseURL = COCKPIT_API_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Cockpit API Error:', error);
      throw error;
    }
  }

  // Get collection items
  async getItems(collection, options = {}) {
    const params = new URLSearchParams();

    if (options.filter) {
      params.append('filter', JSON.stringify(options.filter));
    }
    if (options.sort) {
      params.append('sort', JSON.stringify(options.sort));
    }
    if (options.limit) {
      params.append('limit', options.limit);
    }
    if (options.skip) {
      params.append('skip', options.skip);
    }
    if (options.populate) {
      params.append('populate', options.populate);
    }

    const query = params.toString();
    const endpoint = `/content/items/${collection}${query ? `?${query}` : ''}`;

    return this.request(endpoint);
  }

  // Get single item
  async getItem(collection, id) {
    return this.request(`/content/item/${collection}/${id}`);
  }

  // Get singleton
  async getSingleton(singleton) {
    return this.request(`/content/item/${singleton}`);
  }

  // Get asset
  async getAsset(assetId) {
    return this.request(`/assets/asset/${assetId}`);
  }
}

// one global cockpit instance
const cockpit = new CockpitAPI();

//data-field Selector
async function loadCMS(singletonName) {
  try {
    const data = await cockpit.getSingleton(singletonName);

    document.querySelectorAll("[data-field]").forEach(el => {
      const field = el.dataset.field;

      if (data[field] !== undefined) {
        if (el.tagName === "IMG") {
          el.src = data[field].path || data[field];
        } else {
          el.textContent = data[field];
        }
      }
    });
  } catch (err) {
    console.error(`Failed to load singleton "${singletonName}":`, err);
  }
}

// Collection loader using existing API methods
async function loadCollection(collectionName) {
  try {
    const items = await cockpit.getItems(collectionName, {
      sort: { order: 1 } // Sort by order field ascending
    });

    // Find all elements with data-collection attribute matching this collection
    document.querySelectorAll(`[data-collection="${collectionName}"]`).forEach(el => {
      const field = el.dataset.field;
      
      // Parse index.fieldname format (e.g., "0.title", "1.content")
      if (field && field.includes('.')) {
        const [indexStr, fieldName] = field.split('.');
        const index = parseInt(indexStr);
        
        // Check if we have an item at this index
        if (items[index] && items[index][fieldName] !== undefined) {
          if (el.tagName === "IMG") {
            el.src = items[index][fieldName].path || items[index][fieldName];
            el.alt = items[index][fieldName].title || '';
          } else {
            el.textContent = items[index][fieldName];
          }
        }
      }
    });
  } catch (err) {
    console.error(`Failed to load collection "${collectionName}":`, err);
  }
}