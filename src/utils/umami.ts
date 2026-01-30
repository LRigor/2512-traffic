/**
 * Domain to Umami ID mapping interface
 */
interface DomainUmamiConfig {
  domains: string[];
  umamiid: string;
}

/**
 * 获取当前域名
 * @returns 当前域名
 */
function getCurrentDomain(): string {
  // 获取当前域名，不包含协议和路径
  const domain = window.location.hostname;
  return domain;
}

/**
 * 动态插入 Umami 统计脚本
 * @param websiteId - Umami 网站 ID
 * @param scriptUrl - Umami 脚本地址
 */
function insertUmamiScript(
  websiteId: string,
  scriptUrl: string = "https://cloud.umami.is/script.js"
): void {
  // 检查是否已经存在 Umami 脚本
  if (document.querySelector(`script[data-website-id="${websiteId}"]`)) {
    return;
  }

  // 创建 script 元素
  const script = document.createElement("script");
  script.src = scriptUrl;
  script.setAttribute("data-website-id", websiteId);
  script.async = true;
  script.defer = true;

  // 将脚本添加到文档中
  document.head.appendChild(script);
}

/**
 * Domain to Umami ID mapping configuration
 */
const domain_umamiid: DomainUmamiConfig[] = [
  {
    domains: [],
    umamiid: "",
  },
];

/**
 * 处理 Umami 统计脚本的插入
 * 根据当前域名自动插入对应的 Umami 统计代码
 */
export function handleInsertUmamiScript(): void {
  // 仅在浏览器环境中执行
  if (typeof window === "undefined") {
    return;
  }

  const currentDomain = getCurrentDomain();
  const umamiConfig = domain_umamiid.find((item) =>
    item.domains.includes(currentDomain)
  );

  if (umamiConfig) {
    insertUmamiScript(umamiConfig.umamiid);
  }
}

/**
 * 追踪 Umami 事件
 * @param eventName - 事件名称
 * @param eventData - 事件数据（可选）
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
): void {
  // 仅在浏览器环境中执行
  if (typeof window === "undefined") {
    return;
  }

  // 检查 umami 对象是否存在
  if (typeof (window as any).umami !== "undefined") {
    (window as any).umami.track(eventName, eventData);
  }
}
