// place this file in __mocks__
const { expect, test } = require('@oclif/test')

let pendingAssertions

exports.prompt = prompts => {
    if (!pendingAssertions) {
        return 'inquirer was mocked and used without pending assertions: ${prompts}'
        // throw new Error(`inquirer was mocked and used without pending assertions: ${prompts}`)
    }

    const answers = {}
    let skipped = 0
    prompts.forEach((prompt, i) => {
        if (prompt.when && !prompt.when(answers)) {
            skipped++
            return
        }

        const setValue = val => {
            if (prompt.validate) {
                const res = prompt.validate(val)
                if (res !== true) {
                    throw new Error(`validation failed for prompt: ${prompt}`)
                }
            }
            answers[prompt.name] = prompt.filter
                ? prompt.filter(val)
                : val
        }

        const a = pendingAssertions[i - skipped]

        if (a.message) {
            const message = typeof prompt.message === 'function'
                ? prompt.message(answers)
                : prompt.message
            expect(message).to.contain(a.message)
        }

        if (a.choices) {
            expect(prompt.choices.length).to.equal(a.choices.length)
            a.choices.forEach((c, i) => {
                const expected = a.choices[i]

                if (expected) {
                    expect(prompt.choices[i].name).to.contain(expected)
                }
            })
        }

        if (a.input != null) {
            expect(prompt.type).to.be.a('input')
            setValue(a.input)
        }

        if (a.choose != null) {
            // expect(prompt.type).to.be.a('list')
            setValue(prompt.choices[a.choose].value)
        }

        if (a.check != null) {
            // expect(prompt.type).to.be.a('checkbox')
            setValue(a.check.map(i => prompt.choices[i].value))
        }

        if (a.confirm != null) {
            // expect(prompt.type).to.be.a('confirm')
            setValue(a.confirm)
        }

        if (a.useDefault) {
            expect('default' in prompt).to.be(true)
            setValue(
                typeof prompt.default === 'function'
                    ? prompt.default(answers)
                    : prompt.default
            )
        }
    })

    expect(prompts.length).to.equal(pendingAssertions.length + skipped)
    pendingAssertions = null

    return Promise.resolve(answers)
}

exports.expectPrompts = assertions => {
    pendingAssertions = assertions
}