/**
 * CSS Custom Highlight API를 사용한 텍스트 하이라이팅 유틸리티
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API
 */

/**
 * CSS Highlight API 지원 여부를 확인합니다.
 */
export function isHighlightAPISupported(): boolean {
  return typeof CSS !== "undefined" && "highlights" in CSS;
}

/**
 * 텍스트 노드에서 검색어와 일치하는 부분을 찾아 Range 객체들을 생성합니다.
 * 
 * @param element - 검색할 DOM 요소
 * @param query - 검색어
 * @param caseSensitive - 대소문자 구분 여부 (기본값: false)
 * @returns Range 객체 배열
 */
function createRangesFromQuery(
  element: Element,
  query: string,
  caseSensitive = false
): Range[] {
  const ranges: Range[] = [];
  
  if (!query || query.trim() === "") {
    return ranges;
  }

  const searchQuery = query.trim();
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null
  );

  let textNode: Text | null;
  
  while ((textNode = walker.nextNode() as Text | null)) {
    const text = textNode.textContent || "";
    const searchText = caseSensitive ? text : text.toLowerCase();
    const searchPattern = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    
    let startIndex = 0;
    let matchIndex: number;
    
    // 모든 매칭되는 부분을 찾습니다
    while ((matchIndex = searchText.indexOf(searchPattern, startIndex)) !== -1) {
      const range = document.createRange();
      range.setStart(textNode, matchIndex);
      range.setEnd(textNode, matchIndex + searchPattern.length);
      ranges.push(range);
      
      startIndex = matchIndex + searchPattern.length;
    }
  }

  return ranges;
}

/**
 * CSS Custom Highlight API를 사용하여 텍스트를 하이라이트합니다.
 * 
 * @param element - 하이라이트를 적용할 DOM 요소
 * @param query - 검색어
 * @param highlightName - CSS highlights에 등록할 이름 (기본값: "search-highlight")
 * @param options - 하이라이트 옵션
 */
export function highlightText(
  element: Element | null,
  query: string,
  highlightName = "search-highlight",
  options: {
    caseSensitive?: boolean;
  } = {}
): () => void {
  // 요소가 없거나 API를 지원하지 않는 경우 아무것도 하지 않음
  if (!element || !isHighlightAPISupported()) {
    return () => {};
  }

  const { caseSensitive = false } = options;

  try {
    // 이전 하이라이트 제거
    CSS.highlights.delete(highlightName);

    // 검색어가 없으면 하이라이트 제거만 하고 종료
    if (!query || query.trim() === "") {
      return () => {
        CSS.highlights.delete(highlightName);
      };
    }

    // Range 객체들 생성
    const ranges = createRangesFromQuery(element, query, caseSensitive);

    // Range가 없으면 종료
    if (ranges.length === 0) {
      return () => {
        CSS.highlights.delete(highlightName);
      };
    }

    // Highlight 객체 생성 및 등록
    const highlight = new Highlight(...ranges);
    CSS.highlights.set(highlightName, highlight);

    // CSS 커스텀 프로퍼티를 사용한 스타일 적용
    // 실제 스타일은 CSS 파일에서 정의됨
    // ::highlight(search-highlight) {
    //   background-color: var(--search-highlight-bg, #ffeb3b);
    //   color: var(--search-highlight-color, #000000);
    // }

    // cleanup 함수 반환
    return () => {
      CSS.highlights.delete(highlightName);
    };
  } catch (error) {
    console.error("Error applying highlight:", error);
    return () => {};
  }
}

/**
 * 여러 요소에 하이라이트를 적용합니다.
 * 
 * @param elements - 하이라이트를 적용할 DOM 요소 배열
 * @param query - 검색어
 * @param highlightNamePrefix - CSS highlights에 등록할 이름의 prefix
 * @param options - 하이라이트 옵션
 * @returns cleanup 함수
 */
export function highlightMultipleElements(
  elements: (Element | null)[],
  query: string,
  highlightNamePrefix = "search-highlight",
  options: {
    caseSensitive?: boolean;
  } = {}
): () => void {
  const cleanupFunctions: Array<() => void> = [];

  elements.forEach((element, index) => {
    if (element) {
      const cleanup = highlightText(
        element,
        query,
        `${highlightNamePrefix}-${index}`,
        options
      );
      cleanupFunctions.push(cleanup);
    }
  });

  // 모든 cleanup 함수를 실행하는 함수 반환
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}

/**
 * Fallback: CSS Highlight API를 지원하지 않는 브라우저를 위한 대체 구현
 * <mark> 태그를 사용한 하이라이팅
 * 
 * @param element - 하이라이트를 적용할 DOM 요소
 * @param query - 검색어
 * @param className - 적용할 CSS 클래스 (기본값: "highlight-mark")
 * @returns cleanup 함수
 */
export function highlightTextFallback(
  element: Element | null,
  query: string,
  className = "highlight-mark"
): () => void {
  if (!element || !query || query.trim() === "") {
    return () => {};
  }

  const originalHTML = element.innerHTML;
  const searchQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${searchQuery})`, "gi");
  
  const highlightedHTML = originalHTML.replace(
    regex,
    `<mark class="${className}">$1</mark>`
  );
  
  element.innerHTML = highlightedHTML;

  // cleanup: 원래 HTML로 복원
  return () => {
    element.innerHTML = originalHTML;
  };
}

/**
 * 브라우저 지원에 따라 적절한 하이라이트 함수를 사용합니다.
 * 
 * @param element - 하이라이트를 적용할 DOM 요소
 * @param query - 검색어
 * @param options - 하이라이트 옵션
 * @returns cleanup 함수
 */
export function applyHighlight(
  element: Element | null,
  query: string,
  options: {
    highlightName?: string;
    caseSensitive?: boolean;
    className?: string;
  } = {}
): () => void {
  const { highlightName = "search-highlight", className = "highlight-mark" } = options;

  if (isHighlightAPISupported()) {
    return highlightText(element, query, highlightName, { caseSensitive: options.caseSensitive });
  } else {
    return highlightTextFallback(element, query, className);
  }
}