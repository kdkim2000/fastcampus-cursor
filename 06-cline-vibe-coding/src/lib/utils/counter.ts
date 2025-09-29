/**
 * 카운터 애니메이션을 위한 유틸리티 함수들
 */

/**
 * 숫자 값을 읽기 쉬운 형식으로 포맷팅합니다
 * @param value - 포맷팅할 숫자 값
 * @param locale - 사용할 로케일 (기본값: 'ko-KR')
 * @returns 포맷팅된 문자열
 */
export function formatCounterValue(value: number, locale: string = 'ko-KR'): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M+`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K+`;
  } else {
    return value.toLocaleString(locale);
  }
}

/**
 * 카운터 애니메이션을 수행합니다
 * @param element - 애니메이션 적용할 HTML 요소
 * @param targetValue - 목표 값
 * @param duration - 애니메이션 지속 시간 (ms, 기본값: 2000)
 * @param suffix - 값 뒤에 붙일 접미사 (예: '+', '%')
 * @returns 애니메이션 Promise
 */
export async function animateCounter(
  element: HTMLElement,
  targetValue: number,
  duration: number = 2000,
  suffix: string = ''
): Promise<void> {
  return new Promise((resolve) => {
    const startValue = 0;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutProgress);

      element.textContent = formatCounterValue(currentValue) + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = formatCounterValue(targetValue) + suffix;
        resolve();
      }
    };

    animate();
  });
}

/**
 * Intersection Observer를 사용한 카운터 자동 시작
 * @param selector - 카운터 요소 선택자
 * @param offset - 트리거 offset (기본값: 0.3)
 */
export function setupIntersectionCounter(
  selector: string,
  offset: number = 0.3
): void {
  const elements = document.querySelectorAll(selector);

  if (typeof IntersectionObserver === 'undefined') {
    // Intersection Observer 미지원 브라우저 대응
    elements.forEach(element => {
      const counterElement = element as HTMLElement;
      const targetValue = parseInt(counterElement.dataset.target || '0');
      const suffix = counterElement.dataset.suffix || '';
      animateCounter(counterElement, targetValue, 2000, suffix);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counterElement = entry.target as HTMLElement;
          const targetValue = parseInt(counterElement.dataset.target || '0');
          const suffix = counterElement.dataset.suffix || '';

          animateCounter(counterElement, targetValue, 2000, suffix);

          // 한 번만 실행되도록 observer에서 제거
          observer.unobserve(counterElement);
        }
      });
    },
    {
      threshold: offset,
    }
  );

  elements.forEach(element => observer.observe(element));
}
