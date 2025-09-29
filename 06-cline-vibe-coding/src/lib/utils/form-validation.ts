import { z } from 'zod';

// 컨텍스트 타입 정의
export interface ValidationResult<T = unknown> {
  success: boolean;
  errors?: Record<string, string>;
  data?: T;
}

// Zod 스키마 정의
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 최대 50자까지 가능합니다'),
  email: z
    .string()
    .email('올바른 이메일 주소를 입력해주세요'),
  companyName: z
    .string()
    .optional(),
  type: z.enum(['inquiry', 'partnership', 'support', 'other'], {
    message: '문의 유형을 선택해주세요'
  }),
  message: z
    .string()
    .min(10, '메시지를 최소 10자 이상 입력해주세요')
    .max(1000, '메시지는 최대 1000자까지 가능합니다'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * 폼 데이터를 유효성 검사합니다
 * @param data - 유효성 검사할 데이터
 * @returns 검증 결과
 */
export function validateContactForm(formData: FormData): ValidationResult {
  try {
    const data = Object.fromEntries(formData.entries());

    // 필수 필드 변환
    const validatedData = {
      name: data.name || '',
      email: data.email || '',
      companyName: data.companyName || undefined,
      type: data.type || '',
      message: data.message || '',
    };

    // Zod 검증
    const result = contactFormSchema.safeParse(validatedData);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // 에러 메시지를 사용자 친화적으로 변환
      const errors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path.join('.');
        errors[field] = issue.message;
      });

      return {
        success: false,
        errors,
      };
    }
  } catch (error) {
    console.error('Form validation error:', error);
    console.error('Form validation error:', error);
    return {
      success: false,
      errors: { general: '유효성 검사 중 오류가 발생했습니다' },
    };
  }
}

/**
 * 이메일 주소 형식을 검증합니다
 * @param email - 검증할 이메일 주소
 * @returns 유효성 여부
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 필수 입력 필드들이 모두 채워져 있는지 확인합니다
 * @param data - 확인할 데이터
 * @param requiredFields - 필수 필드 배열
 * @returns 누락된 필드 목록
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  requiredFields: string[]
): string[] {
  return requiredFields.filter(field => {
    const value = data[field];
    return !value || (typeof value === 'string' && value.trim() === '');
  });
}

/**
 * 텍스트 길이 검증
 * @param text - 검증할 텍스트
 * @param minLength - 최소 길이
 * @param maxLength - 최대 길이
 * @returns 유효성 검증 결과
 */
export function validateTextLength(
  text: string,
  minLength: number,
  maxLength?: number
): { valid: boolean; message?: string } {
  if (text.length < minLength) {
    return {
      valid: false,
      message: `최소 ${minLength}자를 입력해주세요`,
    };
  }

  if (maxLength && text.length > maxLength) {
    return {
      valid: false,
      message: `최대 ${maxLength}자까지 가능합니다`,
    };
  }

  return { valid: true };
}

/**
 * 폼 제출 데이터를 정리합니다
 * @param formData - 폼 데이터
 * @returns 정리된 데이터
 */
export function sanitizeFormData(formData: FormData): Record<string, string> {
  const sanitized: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      // XSS 방지를 위한 기본 정리 (실제 프로젝트에서는 더 강력한 sanitization 필요)
      sanitized[key] = value.trim();
    }
  }

  return sanitized;
}
