import { ref, watch } from 'vue';

function sanitizeFullName(value) {
    if (!value) return '';

    let cleaned = value.replace(/[^a-zA-Zà-ỹÀ-Ỹ\s\-']/g, '');

    cleaned = cleaned.trim().replace(/\s+/g, ' ');

    cleaned = cleaned.replace(
        /(^|\s)([a-zà-ỹ])/g,
        (_, space, char) => space + char.toLocaleUpperCase('vi-VN')
    );

    return cleaned;
}


export function useFullNameInput(modelValue) {
    const internalValue = ref(modelValue.value);

    watch(modelValue, (val) => {
        if (val !== internalValue.value) {
            internalValue.value = val;
        }
    });

    function onInput(event) {
        const input = event.target;
        const cursorPos = input.selectionStart;
        const original = input.value;
        const sanitized = sanitizeFullName(original);

        if (sanitized !== original) {
            internalValue.value = sanitized;

            const diff = sanitized.length - original.length;
            const newPos = Math.max(0, Math.min(cursorPos + diff, sanitized.length));

            import('vue').then(({ nextTick }) => {
                nextTick(() => {
                    input.setSelectionRange(newPos, newPos);
                });
            });
        } else {
            internalValue.value = original;
        }
    }

    function onPaste(event) {
        event.preventDefault();
        const pastedText = (event.clipboardData || window.clipboardData).getData('text');
        const sanitized = sanitizeFullName(pastedText);

        const input = event.target;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const before = internalValue.value.slice(0, start);
        const after = internalValue.value.slice(end);

        internalValue.value = sanitizeFullName(before + sanitized + after);
    }

    function validate(value) {
        const sanitized = sanitizeFullName(value ?? internalValue.value);
        if (sanitized.length < 2) {
            return { valid: false, message: 'Họ tên phải có ít nhất 2 ký tự' };
        }
        return { valid: true, value: sanitized };
    }

    return {
        internalValue,
        onInput,
        onPaste,
        validate,
        sanitizeFullName,
    };
}