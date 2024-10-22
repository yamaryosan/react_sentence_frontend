/**
 * フォームの値の型
 */
type Form = {
    name: string,
    email: string,
    message: string,
};

/**
 * お問い合わせの送信を行う
 * @param form フォームの値
 * @returns 認証結果
 */
export async function fetchContact(form: Form): Promise<boolean | undefined> {
    try {
        const name = form.name;
        const email = form.email;
        const message = form.message;
        if (name === '' || email === '' || message === '') {
            throw new Error('フォームの値が空です');
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/contacts?name=${name}&email=${email}&message=${message}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('お問い合わせの送信に失敗しました');
        }
        const result = await response.json();
        return result.isVerified;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}