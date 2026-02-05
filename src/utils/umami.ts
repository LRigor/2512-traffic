/**
 * Domain to Umami ID mapping interface
 */
interface DomainUmamiConfig {
  domains: string[];
  umamiid: string;
}

/**
 * Umami 类型定义
 */
interface Umami {
  track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
}

declare global {
  interface Window {
    umami?: Umami;
  }
}

/**
 * 获取当前域名
 * @returns 当前域名
 */
function getCurrentDomain(): string {
  // 获取当前域名，不包含协议和路径
  if (typeof window === "undefined") {
    return "";
  }
  const domain = window.location.hostname;
  return domain;
}

/**
 * 等待 Umami 脚本加载完成
 * @param maxWaitTime - 最大等待时间（毫秒），默认 5000ms
 * @returns Promise<boolean> - 是否加载成功
 */
function waitForUmami(maxWaitTime: number = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    // 如果已经加载完成，直接返回
    if (window.umami) {
      resolve(true);
      return;
    }

    // 设置超时
    const timeout = setTimeout(() => {
      resolve(false);
    }, maxWaitTime);

    // 轮询检查
    const checkInterval = setInterval(() => {
      if (window.umami) {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        resolve(true);
      }
    }, 100);
  });
}

/**
 * 动态插入 Umami 统计脚本
 * @param websiteId - Umami 网站 ID
 * @param scriptUrl - Umami 脚本地址
 * @returns Promise<void> - 脚本加载完成的 Promise
 */
function insertUmamiScript(
  websiteId: string,
  scriptUrl: string = "https://cloud.umami.is/script.js"
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查是否已经存在 Umami 脚本
    if (document.querySelector(`script[data-website-id="${websiteId}"]`)) {
      // 如果脚本已存在，等待它加载完成
      waitForUmami().then(() => resolve());
      return;
    }

    // 创建 script 元素
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.setAttribute("data-website-id", websiteId);
    script.async = true;
    script.defer = true;

    // 监听脚本加载完成
    script.onload = () => {
      // 等待 Umami 对象初始化
      waitForUmami().then(() => resolve());
    };

    script.onerror = () => {
      reject(new Error("Failed to load Umami script"));
    };

    // 将脚本添加到文档中
    document.head.appendChild(script);
  });
}

/**
 * Domain to Umami ID mapping configuration
 */
const domain_umamiid: DomainUmamiConfig[] = [
  {
    domains: ["aifinds.ai"],
    umamiid: "79d655a9-6c62-4fcc-8de7-10b986764193", //https://cloud.umami.is/analytics/us/teams/80aefb14-0bd6-4008-a482-a3abd24707c6/websites/79d655a9-6c62-4fcc-8de7-10b986764193
  },
];

// 事件队列：在 Umami 加载完成前暂存事件
let eventQueue: Array<{ eventName: string; eventData?: Record<string, string | number | boolean> }> = [];
let isUmamiReady = false;

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
    insertUmamiScript(umamiConfig.umamiid)
      .then(() => {
        isUmamiReady = true;
        // 处理队列中的事件
        eventQueue.forEach(({ eventName, eventData }) => {
          if (window.umami) {
            window.umami.track(eventName, eventData);
          }
        });
        eventQueue = [];
      })
      .catch((error) => {
        console.error("Failed to load Umami:", error);
      });
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

  // 如果 Umami 已准备好，直接追踪
  if (isUmamiReady && window.umami) {
    try {
      window.umami.track(eventName, eventData);
    } catch (error) {
      console.error("Failed to track Umami event:", error);
    }
  } else {
    // 否则加入队列，等待 Umami 加载完成
    eventQueue.push({ eventName, eventData });
    
    // 如果队列太长，尝试等待 Umami 加载（最多等待 2 秒）
    if (eventQueue.length === 1) {
      waitForUmami(2000).then((ready) => {
        if (ready && window.umami) {
          isUmamiReady = true;
          eventQueue.forEach(({ eventName: name, eventData: data }) => {
            try {
              window.umami!.track(name, data);
            } catch (error) {
              console.error("Failed to track Umami event:", error);
            }
          });
          eventQueue = [];
        }
      });
    }
  }
}
