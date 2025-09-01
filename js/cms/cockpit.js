const COCKPIT_API_URL = "https://cms-shc.eu/api"

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