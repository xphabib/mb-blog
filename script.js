const postList = document.querySelector("#postList");
const article = document.querySelector("#article");
const search = document.querySelector("#search");
const homeLink = document.querySelector("#homeLink");
const aboutLink = document.querySelector("#aboutLink");
const layout = document.querySelector("#layout");
let posts = [];
let categories = [];
let activeSlug = "";
let activeCategory = "";
let lastRoute = "home";

function titleFromSlug(slug) {
  return slug
    .split("/")
    .pop()
    .replace(/\.md$/, "")
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slugToPath(slug) {
  return `/${slug.replace(/\.md$/, "")}`;
}

function routeFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const post = params.get("post");
  if (page) return page;
  if (post) return post;

  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const legacyHash = window.location.hash.replace(/^#\/?/, "");
  return path || legacyHash || "home";
}

function updateRoute(path, replace = false) {
  const nextPath = path.startsWith("/") ? path : `/${path}`;
  const currentPath = `${window.location.pathname}${window.location.search}`;
  if (currentPath === nextPath && !window.location.hash) return;
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", nextPath);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function markdownToHtml(markdown) {
  const lines = markdown.trim().split(/\r?\n/);
  const html = [];
  let listOpen = false;
  let codeOpen = false;
  let paragraph = [];

  function closeParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!listOpen) return;
    html.push("</ul>");
    listOpen = false;
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      closeParagraph();
      closeList();
      if (codeOpen) {
        html.push("</code></pre>");
      } else {
        html.push("<pre><code>");
      }
      codeOpen = !codeOpen;
      continue;
    }

    if (codeOpen) {
      html.push(escapeHtml(line) + "\n");
      continue;
    }

    if (!line.trim()) {
      closeParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const item = line.match(/^-\s+(.+)$/);
    if (item) {
      closeParagraph();
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(item[1])}</li>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  closeParagraph();
  closeList();
  if (codeOpen) html.push("</code></pre>");
  return html.join("\n");
}

function parseFrontMatter(markdown, slug) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  const meta = {};
  let body = markdown;

  if (match) {
    body = match[2];
    for (const line of match[1].split(/\r?\n/)) {
      const separator = line.indexOf(":");
      if (separator === -1) continue;
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim();
      meta[key] = value;
    }
  }

  return {
    slug,
    title: meta.title || slug.replace(/-/g, " ").replace(/\.md$/, ""),
    date: meta.date || "",
    excerpt: meta.excerpt || "",
    body,
  };
}

async function loadPost(post) {
  if (post.loaded) return post;

  const response = await fetch(`/posts/${post.slug}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load posts/${post.slug}`);

  const parsedPost = parseFrontMatter(await response.text(), post.slug);
  Object.assign(post, parsedPost, {
    category: post.category,
    categoryTitle: post.categoryTitle,
    loaded: true,
  });
  return post;
}

function parseIndex(indexMarkdown) {
  return indexMarkdown
    .split(/\r?\n/)
    .map((line) => line.match(/^-\s+(.+?)\s*$/))
    .filter(Boolean)
    .map((match) => match[1]);
}

function parsePostEntries(indexMarkdown) {
  return parseIndex(indexMarkdown)
    .filter((entry) => entry.includes(".md"))
    .map((entry) => {
      const [filename, title, excerpt, date] = entry.split("|").map((part) => part.trim());
      return {
        filename,
        title: title || titleFromSlug(filename),
        excerpt: excerpt || "",
        date: date || "",
      };
    });
}

function parseCategoryTitle(indexMarkdown, fallback) {
  const heading = indexMarkdown.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return fallback.replace(/-/g, " ");
}

function renderList() {
  const query = search.value.trim().toLowerCase();
  const currentPost = posts.find((post) => post.slug === activeSlug);
  const selectedCategory = activeCategory || currentPost?.category || "";
  if (!selectedCategory && !layout.classList.contains("home-layout")) {
    postList.innerHTML = "";
    return;
  }

  const visiblePosts = posts.filter((post) => {
    const text = `${post.categoryTitle} ${post.title} ${post.excerpt} ${post.body}`.toLowerCase();
    return text.includes(query);
  });
  const visibleCategories = selectedCategory
    ? categories.filter((category) => category.slug === selectedCategory)
    : categories;

  postList.innerHTML = visibleCategories.map((category) => {
    const categoryPosts = visiblePosts.filter((post) => post.category === category.slug);
    if (!categoryPosts.length) return "";

    return `
      <section class="category">
        <h2 class="category-title">${escapeHtml(category.title)}</h2>
        ${categoryPosts.map((post) => `
          <button class="post-button" type="button" data-slug="${post.slug}" aria-current="${post.slug === activeSlug}">
            <strong>${escapeHtml(post.title)}</strong>
            <span>${escapeHtml(post.excerpt || post.categoryTitle)}</span>
          </button>
        `).join("")}
      </section>
    `;
  }).join("") || '<p class="empty">No posts found.</p>';
}

function renderHome(updateUrl = true) {
  activeSlug = "";
  activeCategory = "";
  lastRoute = "home";
  layout.classList.add("home-layout");
  if (updateUrl) updateRoute("/");
  homeLink.setAttribute("aria-current", "page");
  aboutLink.removeAttribute("aria-current");
  article.innerHTML = `
    <h1>Engineering, Programming এবং Learning Notes</h1>
    <p class="meta">Mohammad Habibur Rahman-এর software engineering, programming, web development, career growth, এবং English learning নিয়ে practical লেখা।</p>
    <div class="content">
      <p>এই ব্লগে backend engineering, Ruby on Rails, JavaScript, databases, deployment, system design, problem solving, productivity, এবং English learning নিয়ে অভিজ্ঞতা-ভিত্তিক নোট রাখা হয়েছে।</p>
      <h2 class="section-title">Categories</h2>
      <div class="home-grid">
        ${categories.map((category) => {
          const count = posts.filter((post) => post.category === category.slug).length;
          const firstPost = posts.find((post) => post.category === category.slug);
          return `
            <button class="home-card" type="button" data-slug="${firstPost ? escapeHtml(firstPost.slug) : ""}">
              <strong>${escapeHtml(category.title)}</strong>
              <span>${count} posts</span>
            </button>
          `;
        }).join("")}
      </div>
      <h2 class="section-title">Recent Blogs</h2>
      <div class="home-grid">
        ${posts.slice(0, 4).map((post) => `
          <button class="home-card" type="button" data-slug="${escapeHtml(post.slug)}">
            <strong>${escapeHtml(post.title)}</strong>
            <span>${escapeHtml(post.categoryTitle)} · ${escapeHtml(post.date)}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
  renderList();
}

function renderAbout(updateUrl = true) {
  activeSlug = "";
  activeCategory = "";
  lastRoute = "about";
  layout.classList.add("home-layout");
  if (updateUrl) updateRoute("/about");
  homeLink.removeAttribute("aria-current");
  aboutLink.setAttribute("aria-current", "page");
  article.innerHTML = `
    <h1>Mohammad Habibur Rahman</h1>
    <p class="meta">Senior Software Engineer · Ruby on Rails · Express.js · Dhaka, Bangladesh</p>
    <div class="content">
      <p>I am a full-stack web developer with 6+ years of experience building scalable web applications, REST APIs, admin dashboards, backend systems, and deployment workflows. My core expertise is Ruby on Rails, JavaScript, PostgreSQL, Node.js, Express.js, and cloud infrastructure on AWS and DigitalOcean.</p>
      <p>I work on performance optimization, database query tuning, production issue solving, automated deployment, and maintainable application architecture. I have led and contributed to client products involving Rails upgrades, background jobs, API integrations, payment systems, document generation, CRM tools, mobile app backends, and admin panels.</p>

      <div class="about-summary">
        <section class="about-panel">
          <h2>Experience</h2>
          <ul>
            <li>Senior Software Engineer at Syftet Limited, Dhaka.</li>
            <li>Built scalable systems using Ruby on Rails, PostgreSQL, Redis, and modern JavaScript.</li>
            <li>Improved API and database performance through query optimization, indexing, and N+1 fixes.</li>
            <li>Managed AWS and DigitalOcean infrastructure with Nginx, Puma, and Capistrano deployments.</li>
            <li>Worked on projects including Cince, DailyIslam, Trusteeze, Lienexpos, Welcome App, and IFarmer.</li>
          </ul>
          <div class="skill-list">
            <span>Ruby</span>
            <span>Ruby on Rails</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>Next.js</span>
            <span>PostgreSQL</span>
            <span>MySQL</span>
            <span>Prisma</span>
            <span>AWS</span>
            <span>DigitalOcean</span>
            <span>Docker</span>
            <span>CI/CD</span>
          </div>
        </section>

        <section class="about-panel">
          <h2>Contact Me</h2>
          <div class="contact-list">
            <a href="tel:+8801619391044">Phone: 01619391044</a>
            <a href="tel:+8801729391044">Phone: 01729391044</a>
            <a href="mailto:xphabib@gmail.com">Email: xphabib@gmail.com</a>
            <a href="https://xphabib.com" target="_blank" rel="noreferrer">Website: xphabib.com</a>
            <a href="https://github.com/xphabib" target="_blank" rel="noreferrer">GitHub: github.com/xphabib</a>
            <a href="https://www.linkedin.com/in/xphabib" target="_blank" rel="noreferrer">LinkedIn: linkedin.com/in/xphabib</a>
          </div>
        </section>
      </div>
    </div>
  `;
  renderList();
}

async function renderPost(slug, updateUrl = true) {
  const post = posts.find((item) => item.slug === slug) || posts[0];
  if (!post) {
    article.innerHTML = '<p class="empty">No posts yet.</p>';
    return;
  }

  article.innerHTML = `
    <div class="loading-state">
      <div class="loading-mark" aria-hidden="true"></div>
      <h1>Preparing Article</h1>
      <p>Loading the selected note.</p>
    </div>
  `;

  try {
    await loadPost(post);
  } catch (error) {
    article.innerHTML = `
      <div class="error">
        <strong>Article could not be loaded.</strong>
        <p>${escapeHtml(error.message)}</p>
      </div>
    `;
    return;
  }

  const categoryPosts = posts.filter((item) => item.category === post.category);
  const postIndex = categoryPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = categoryPosts[postIndex - 1];
  const nextPost = categoryPosts[postIndex + 1];
  activeSlug = post.slug;
  activeCategory = post.category;
  lastRoute = post.slug;
  layout.classList.remove("home-layout");
  homeLink.removeAttribute("aria-current");
  aboutLink.removeAttribute("aria-current");
  if (updateUrl) updateRoute(slugToPath(post.slug));
  article.innerHTML = `
    <h1>${escapeHtml(post.title)}</h1>
    <p class="meta">${escapeHtml([post.categoryTitle, post.excerpt].filter(Boolean).join(" · "))}</p>
    <div class="content">${markdownToHtml(post.body)}</div>
    <nav class="post-nav" aria-label="Post navigation">
      <button class="nav-button previous" type="button" data-slug="${previousPost ? escapeHtml(previousPost.slug) : ""}" ${previousPost ? "" : "disabled"}>
        <span>Previous Blog</span>
        <strong>${escapeHtml(previousPost ? previousPost.title : "No previous post")}</strong>
      </button>
      <button class="nav-button next" type="button" data-slug="${nextPost ? escapeHtml(nextPost.slug) : ""}" ${nextPost ? "" : "disabled"}>
        <span>Next Blog</span>
        <strong>${escapeHtml(nextPost ? nextPost.title : "No next post")}</strong>
      </button>
    </nav>
  `;
  renderList();
}

function matchingPosts(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return posts.filter((post) => {
    const text = `${post.categoryTitle} ${post.title} ${post.excerpt} ${post.body}`.toLowerCase();
    return text.includes(normalizedQuery);
  });
}

function renderSearchResults() {
  const query = search.value.trim();
  if (!query) {
    if (lastRoute && lastRoute !== "home") {
      renderPost(lastRoute);
    } else {
      renderHome();
    }
    return;
  }

  const results = matchingPosts(query);
  activeSlug = "";
  activeCategory = "";
  layout.classList.add("home-layout");
  homeLink.removeAttribute("aria-current");
  aboutLink.removeAttribute("aria-current");
  article.innerHTML = `
    <h1>Search Results</h1>
    <p class="meta">${results.length} result${results.length === 1 ? "" : "s"} for "${escapeHtml(query)}"</p>
    <div class="search-results">
      ${results.map((post) => `
        <button class="home-card" type="button" data-slug="${escapeHtml(post.slug)}">
          <strong>${escapeHtml(post.title)}</strong>
          <span>${escapeHtml(post.categoryTitle)} · ${escapeHtml(post.date || post.excerpt)}</span>
        </button>
      `).join("") || '<p class="empty">No posts found.</p>'}
    </div>
  `;
  renderList();
}

async function loadPosts() {
  try {
    const indexResponse = await fetch("/posts/index.md", { cache: "no-store" });
    if (!indexResponse.ok) throw new Error("Could not load posts/index.md");
    const categorySlugs = parseIndex(await indexResponse.text());
    const groupedPosts = await Promise.all(categorySlugs.map(async (categorySlug) => {
      const categoryResponse = await fetch(`/posts/${categorySlug}/index.md`, { cache: "no-store" });
      if (!categoryResponse.ok) throw new Error(`Could not load posts/${categorySlug}/index.md`);
      const categoryIndex = await categoryResponse.text();
      const category = {
        slug: categorySlug,
        title: parseCategoryTitle(categoryIndex, categorySlug),
      };
      const postEntries = parsePostEntries(categoryIndex);
      const categoryPosts = postEntries.map((entry) => {
        return {
          slug: `${categorySlug}/${entry.filename}`,
          title: entry.title,
          date: entry.date,
          excerpt: entry.excerpt,
          body: "",
          category: category.slug,
          categoryTitle: category.title,
          loaded: false,
        };
      });

      return { category, posts: categoryPosts };
    }));

    categories = groupedPosts.map((group) => group.category);
    posts = groupedPosts.flatMap((group) => group.posts);

    posts.sort((a, b) => b.date.localeCompare(a.date));
    const route = routeFromLocation();
    if (window.location.hash) {
      if (route === "home") {
        updateRoute("/", true);
      } else if (route === "about") {
        updateRoute("/about", true);
      } else {
        updateRoute(`/${route}`, true);
      }
    }
    const initialPost = posts.find((post) => post.slug.replace(/\.md$/, "") === route);
    if (!route || route === "home") {
      renderHome(false);
    } else if (route === "about") {
      renderAbout(false);
    } else {
      renderPost(initialPost ? initialPost.slug : posts[0]?.slug, false);
    }
  } catch (error) {
    activeSlug = "";
    activeCategory = "";
    postList.innerHTML = "";
    layout.classList.add("home-layout");
    homeLink.removeAttribute("aria-current");
    aboutLink.removeAttribute("aria-current");
    article.innerHTML = `
      <div class="error">
        <strong>Posts could not be loaded.</strong>
        <p>Open this with a local server, for example: <code>python3 -m http.server 8000</code></p>
        <p>${escapeHtml(error.message)}</p>
      </div>
    `;
  }
}

postList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-slug]");
  if (button) {
    search.value = "";
    renderPost(button.dataset.slug);
  }
});

homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  search.value = "";
  renderHome();
});

aboutLink.addEventListener("click", (event) => {
  event.preventDefault();
  search.value = "";
  renderAbout();
});

article.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-slug]");
  if (button && button.dataset.slug) {
    search.value = "";
    renderPost(button.dataset.slug);
  }
});

search.addEventListener("input", renderSearchResults);
window.addEventListener("popstate", () => {
  if (search.value.trim()) search.value = "";
  const route = routeFromLocation();
  if (route === "home") {
    renderHome(false);
    return;
  }
  if (route === "about") {
    renderAbout(false);
    return;
  }
  const post = posts.find((item) => item.slug.replace(/\.md$/, "") === route);
  if (post) renderPost(post.slug, false);
});

loadPosts();
